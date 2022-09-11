import React, { PropsWithChildren } from 'react';

import { Card, Typography, Divider } from 'antd';

import { Icon, Skeleton } from 'shared/modules';

import useStyles from './profile-detail.style';
import { NONE_TEXT } from 'shared/constants';

export interface IItemList<T> {
  label: string;
  key: Extract<keyof T, string>;
  formatter?: (value: any) => string;
}

interface IProfileDetail<T> {
  data?: T;
  title?: string;
  description?: string;
  avatar?: string | null;
  isLoading?: boolean;
  itemList?: IItemList<T>[];
}

const { Title, Text } = Typography;

const ProfileDetail = <T,>({
  data,
  avatar,
  title = '',
  description = '',
  itemList = [],
  isLoading = false,
}: PropsWithChildren<IProfileDetail<T>>) => {
  const classes = useStyles();

  return (
    <Card className={`profile-detail ${classes.root}`}>
      <div className="avatar">
        {avatar ? (
          <img src={avatar} />
        ) : (
          <div className="default-avatar">
            <Icon type="user" />
          </div>
        )}
        <div className="profile-name">
          <Skeleton isLoading={isLoading} type="input" size="small">
            <Title level={5}>{title}</Title>
            <Text strong type="secondary">
              {description}
            </Text>
          </Skeleton>
        </div>
      </div>
      <Divider />
      <div className="profile-info">
        <Text strong>{'Información'}</Text>
        <div className="profile-detail-content">
          {itemList.map(({ label, key, formatter }) => (
            <div className="profile-detail-item" key={key}>
              <Skeleton isLoading={isLoading} type="input" size="large" fullWidth>
                <Text strong type="secondary">
                  {label}
                </Text>
                <Text>{data?.[key] ? (formatter ? formatter(data[key]) : data[key]) : NONE_TEXT}</Text>
              </Skeleton>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProfileDetail;
