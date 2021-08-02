import { createContext } from 'react';

import { IPlanActivity } from 'shared/model';

export interface INotificationContext {
  isOpen: boolean;
  count?: number;
  isLoading: boolean;
  isBadgeVisible?: boolean;
  notifications: IPlanActivity[];
  toggleModal: () => void;
  reload: () => Promise<void>;
  readNotification: (uuid: string, index: number) => Promise<void>;
  readAllNotifications: () => Promise<void>;
  clearNewNotifications: () => Promise<void>;
}

export default createContext<INotificationContext>({
  isOpen: false,
  count: undefined,
  isLoading: true,
  isBadgeVisible: false,
  notifications: [],
  toggleModal: () => {},
  reload: () => Promise.resolve(),
  readNotification: () => Promise.resolve(),
  readAllNotifications: () => Promise.resolve(),
  clearNewNotifications: () => Promise.resolve()
});
