import React, { FC, useState, useEffect, useContext } from 'react';

import NotificationContext from './notification.context';

import { AuthContext } from '.';

import {
  GetPlanActivitiesDocument,
  useGetPlanActivitiesLazyQuery,
  useReadAllPlanActivitiesMutation,
  useCleanNewPlanActivitiesMutation,
  useUpdatePlanActivityMutation
} from 'shared/generated';

const take = 50;

const NotificationProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const [updatePlanActivity] = useUpdatePlanActivityMutation();
  const [readAllPlanActivities] = useReadAllPlanActivitiesMutation();
  const [cleanNewPlanActivities] = useCleanNewPlanActivitiesMutation();

  const [getNotifications, { data, loading, refetch }] = useGetPlanActivitiesLazyQuery({
    variables: { take, skip: 0 },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  });

  const notifications = data?.payload || [];
  const newNotifications = data?.payload.filter(({ isNew }) => isNew);
  const unseenNotifications = data?.payload.filter(({ seen }) => !seen);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const reload = async () => {
    await refetch!({ take, skip: 0 });
  };

  const readNotification = async (uuid: string, index: number) => {
    toggleModal();

    if (!notifications[index].seen) {
      await updatePlanActivity({
        variables: {
          where: { uuid },
          data: { seen: true }
        },
        update: cache => {
          cache.writeQuery({
            data: {
              payload: notifications.map((notification, position) =>
                position === index ? { ...notification, seen: true } : notification
              )
            },
            query: GetPlanActivitiesDocument,
            variables: {
              where: { take, skip: 0 }
            }
          });
        }
      });
    }
  };

  const readAllNotifications = async () => {
    toggleModal();

    await readAllPlanActivities({
      update: cache => {
        cache.writeQuery({
          data: {
            payload: notifications.map(notification => ({
              ...notification,
              seen: true
            }))
          },
          query: GetPlanActivitiesDocument,
          variables: {
            where: { take, skip: 0 }
          }
        });
      }
    });
  };

  const clearNewNotifications = async () => {
    if (data?.payload.find(({ isNew }) => isNew)) {
      await cleanNewPlanActivities({
        update: cache => {
          cache.writeQuery({
            data: {
              payload: notifications.map(notification => ({
                ...notification,
                new: false
              }))
            },
            query: GetPlanActivitiesDocument,
            variables: {
              where: { take, skip: 0 }
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getNotifications({ variables: { take, skip: 0 } });
    }
  }, [isAuthenticated]);

  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        notifications,
        isLoading: loading,
        count: newNotifications?.length,
        isBadgeVisible: !!unseenNotifications?.length,
        reload,
        toggleModal,
        readNotification,
        readAllNotifications,
        clearNewNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
