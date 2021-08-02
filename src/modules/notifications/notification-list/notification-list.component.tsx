import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { LoadingOutlined } from '@ant-design/icons';

import { NotificationItem } from 'modules/notifications/notifications.module';

import { NotificationContext } from 'shared/contexts';

import { getNotificationProps } from './notification-list.util';

import useStyles from './notification-list.style';

const NotificationList: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const redirect = history.push;

  const { notifications, isLoading, reload, readNotification } = useContext(NotificationContext);

  const onNotificationClick = async (uuid: string, index: number, url: string) => {
    redirect(url);

    await readNotification(uuid, index);
  };

  return (
    <div className={classes.root}>
      {notifications.map((notification, index) => {
        const notificationProps = getNotificationProps(notification.type, notification);

        return (
          <NotificationItem
            {...getNotificationProps(notification.type, notification)}
            onClick={() => onNotificationClick(notification.uuid, index, notificationProps.url)}
          />
        );
      })}
      <div className="no-more-to-load" />
      <div className="all-notifications">
        {isLoading ? <LoadingOutlined className="loading-spinner" spin /> : <a onClick={reload}>Recargar</a>}
      </div>
    </div>
  );
};

export default NotificationList;
