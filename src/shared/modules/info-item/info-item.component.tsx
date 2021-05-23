import React, { FC, ReactNode } from 'react';

import { Statistic } from 'antd';

import { Skeleton } from 'shared/modules';

interface IInfoItem {
  label: string;
  value?: string;
  isLoading?: boolean;
  valueRender?: (node: ReactNode) => ReactNode;
}

const InfoItem: FC<IInfoItem> = ({ label, value, isLoading = true, valueRender }) => {
  const val = valueRender
    ? valueRender
    : () => (
        <Skeleton isLoading={isLoading} type="input">
          {value}
        </Skeleton>
      );

  return (
    <Statistic
      title={label}
      valueStyle={{
        fontSize: 16
      }}
      style={{
        marginRight: 46
      }}
      valueRender={val}
    />
  );
};

export default InfoItem;
