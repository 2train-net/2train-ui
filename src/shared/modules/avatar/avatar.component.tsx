import React, { FC } from 'react';

import { Avatar as AvatarAD } from 'antd';

import useStyles from './avatar.style';

type AvatarSize = 'default' | 'large' | 'small';

interface IAvatar {
  url?: string | null;
  letter?: string;
  size?: AvatarSize;
  className?: string;
}

const Avatar: FC<IAvatar> = ({ url, letter, className = 'avatar', size = 'default', ...props }) => {
  const classes = useStyles();

  return (
    <AvatarAD className={`${classes.root} ${className}`} size={size} src={url} {...props}>
      {letter}
    </AvatarAD>
  );
};

export default Avatar;
