import React, { FC } from 'react';

import { Skeleton as ADSkeleton } from 'antd';

type SkeletonType = 'avatar' | 'input';
type SkeletonSize = 'small' | 'large' | 'default';

interface ISkeleton {
  isLoading?: boolean;
  isActive?: boolean;
  type?: SkeletonType;
  size?: SkeletonSize;
}

const skeletonDictionary = {
  avatar: {
    render: ADSkeleton.Avatar,
    props: {}
  },
  input: {
    render: ADSkeleton.Input,
    props: { style: { width: 100 } }
  }
};

const Skeleton: FC<ISkeleton> = ({ children, type, isLoading = true, isActive = true, size = 'default' }) => {
  const { render = null, props = {} } = type ? skeletonDictionary[type] : {};
  const Component = render && isLoading ? render : ADSkeleton;

  return (
    <Component loading={isLoading} active={isActive} size={size} {...props}>
      {children}
    </Component>
  );
};

export default Skeleton;
