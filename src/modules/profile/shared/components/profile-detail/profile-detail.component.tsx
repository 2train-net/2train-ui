import React, { PropsWithChildren } from 'react';

import { Card, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import useStyles from './profile-detail.style';

interface IProfileDetail<T> {
  data?: T;
  title?: string;
  description?: string;
  avatar?: string | null;
  itemList?: { label: string; key: Extract<keyof T, string> }[];
}

const { Title, Text } = Typography;

const ProfileDetail = <T,>({
  data,
  avatar,
  title = '',
  description = '',
  itemList = []
}: PropsWithChildren<IProfileDetail<T>>) => {
  const classes = useStyles();

  return (
    <Card className={`profile-detail ${classes.root}`}>
      <div className="avatar">
        {avatar ? (
          <img src={avatar} />
        ) : (
          <div className="default-avatar">
            <UserOutlined />
          </div>
        )}
        <div className="profile-name">
          <Title level={5}>{title}</Title>
          <Text strong type="secondary">
            {description}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="profile-info">
        <Text strong>{'Información'}</Text>
        <div className="profile-detail-content">
          {itemList.map(({ label, key }) => (
            <div className="profile-detail-item" key={key}>
              <Text strong type="secondary">
                {label}
              </Text>
              <Text>{data?.[key]}</Text>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProfileDetail;
