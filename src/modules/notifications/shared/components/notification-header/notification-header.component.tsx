import React, { FC } from 'react';

interface INotificationHeader {
  readAllNotifications: () => Promise<void>;
}

const NotificationHeader: FC<INotificationHeader> = ({ readAllNotifications }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{'Notificaciones'}</span>
      <a style={{ fontSize: 12 }} onClick={readAllNotifications}>
        {'Leer todos'}
      </a>
    </div>
  );
};

export default NotificationHeader;
