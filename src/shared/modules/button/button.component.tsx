import React, { FC } from 'react';

import { Button as ADButton } from 'antd';

import useStyles from './button.style';

export type ButtonColor = 'primary' | 'secondary';
export type ButtonVariant = 'contained' | 'outlined';

interface IButton {
  children: any;
  color?: ButtonColor;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  type?: 'submit' | 'button' | 'reset' | undefined;
  onClick?: () => any;
}

const Button: FC<IButton> = ({
  children,
  type = 'submit',
  color = 'primary',
  variant = 'contained',
  fullWidth = false,
  onClick
}) => {
  const classes = useStyles({ color, variant });

  return (
    <ADButton onClick={onClick} htmlType={type} className={classes.root} block={fullWidth}>
      {children}
    </ADButton>
  );
};

export default Button;
