import React, { FC } from 'react';

import { Button as ADButton } from 'antd';

import { FormId } from 'shared/model';

import useStyles from './button.style';

export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'default';
export type ButtonVariant = 'contained' | 'outlined';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonType = 'submit' | 'button' | 'reset';

interface IButton {
  children: any;
  form?: FormId;
  color?: ButtonColor;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  className?: string;
  onClick?: () => any;
}

const Button: FC<IButton> = ({
  children,
  form,
  className = '',
  type = 'submit',
  color = 'primary',
  variant = 'contained',
  size = 'large',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick
}) => {
  const classes = useStyles({ color, variant, size });

  return (
    <ADButton
      onClick={onClick}
      htmlType={type}
      className={`${classes.root} ${className}`}
      block={fullWidth}
      disabled={disabled}
      loading={loading}
      form={form}
    >
      {loading ? '' : children}
    </ADButton>
  );
};

export default Button;
