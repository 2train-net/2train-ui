import React, { FC } from 'react';

interface IStatus {
  status: 'ACTIVE' | 'INACTIVE';
}

const getColorByStatus = {
  ACTIVE: 'green',
  INACTIVE: 'red'
};

const Status: FC<IStatus> = ({ status }) => {
  return (
    <span
      style={{
        backgroundColor: getColorByStatus[status],
        width: 10,
        height: 10,
        borderRadius: '50%',
        display: 'inline-block'
      }}
    />
  );
};

export default Status;
