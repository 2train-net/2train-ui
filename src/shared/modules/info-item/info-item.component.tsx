import React, { FC, ReactNode } from 'react';

import { Statistic } from 'antd';

interface IInfoItem {
  label: string;
  value?: string;
  valueRender?: (node: ReactNode) => ReactNode;
}

const InfoItem: FC<IInfoItem> = ({ label, value, valueRender }) => {
  return (
    <Statistic
      title={label}
      value={value}
      valueStyle={{
        fontSize: 16
      }}
      style={{
        marginRight: 46
      }}
      valueRender={valueRender}
    />
  );
};

export default InfoItem;
