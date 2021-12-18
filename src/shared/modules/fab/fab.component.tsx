import React, { FC } from 'react';

import { Icon, Button } from 'shared/modules';
import { IconType } from 'shared/modules/icon/icon.component';

import useStyles from './fab.style';

interface IFloatingActionButton {
  icon?: IconType;
  className?: string;
  onClick?: () => any;
}

const FloatingActionButton: FC<IFloatingActionButton> = ({ icon = 'plus', className = '', onClick }) => {
  const classes = useStyles();

  return (
    <Button className={`${classes.root} ${className}`} onClick={onClick}>
      <Icon type={icon} />
    </Button>
  );
};

export default FloatingActionButton;
