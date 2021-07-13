import React, { CSSProperties, FC } from 'react';

import { v4 as uuid } from 'uuid';

import { Skeleton as ADSkeleton } from 'antd';

import { spacing } from 'shared/theme';

import useStyles from './skeleton.style';

type SkeletonType = 'avatar' | 'input' | 'card';
type SkeletonSize = 'small' | 'large' | 'default';

interface ISkeleton {
  isLoading?: boolean;
  isActive?: boolean;
  type?: SkeletonType;
  size?: SkeletonSize;
  multiple?: number;
  spaceBetween?: number;
  fullWidth?: boolean;
}

interface ISkeletonRender {
  [key: string]: {
    render: any;
    props: { style?: CSSProperties };
  };
}

const skeletonDictionary: ISkeletonRender = {
  avatar: {
    render: ADSkeleton.Avatar,
    props: {}
  },
  input: {
    render: ADSkeleton.Input,
    props: { style: { width: 100 } }
  },
  card: {
    render: ADSkeleton.Button,
    props: { style: { width: 324, height: 125 } }
  }
};

const Skeleton: FC<ISkeleton> = ({
  children,
  type,
  multiple = 1,
  spaceBetween = 1,
  isLoading = true,
  isActive = true,
  size = 'default',
  fullWidth = false
}) => {
  const classes = useStyles({ fullWidth });
  const { render = null, props = {} } = type ? skeletonDictionary[type] : {};
  const Component = render && isLoading ? render : ADSkeleton;

  const skeletons = Array.from(Array(multiple).keys());

  return (
    <>
      {isLoading
        ? skeletons.map(() => (
            <Component
              {...props}
              key={`skeleton-${uuid()}`}
              loading={isLoading}
              active={isActive}
              size={size}
              className={`skeleton-item ${classes.root}`}
              style={{ marginRight: spacing(spaceBetween), ...props?.style }}
            />
          ))
        : children}
    </>
  );
};

export default Skeleton;
