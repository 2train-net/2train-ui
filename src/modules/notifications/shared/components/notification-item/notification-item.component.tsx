import { Typography } from 'antd';
import React, { FC } from 'react';

import { Icon } from 'shared/modules';
import { IconType } from 'shared/modules/icon/icon.component';

import useStyles from './notification-item.style';

export interface INotificationItem {
  key: string;
  url: string;
  icon: IconType;
  color: string;
  label: string;
  description: string;
  isDotVisible: boolean;
  onClick?: () => any;
}

const NotificationItem: FC<INotificationItem> = ({ url, icon, color, label, description, isDotVisible, onClick }) => {
  const classes = useStyles();

  return (
    <div className={`notification-item ${classes.root}`} onClick={onClick}>
      <div className="icon-avatar" style={{ backgroundColor: color }}>
        <Icon type={icon} />
      </div>
      <div style={{ marginLeft: 8 }}>
        <Typography.Text strong>{label}</Typography.Text>
        <Typography.Text type="secondary">{description}</Typography.Text>
      </div>
      {isDotVisible && <span className="new-notification" />}
    </div>
  );
};

export default NotificationItem;
