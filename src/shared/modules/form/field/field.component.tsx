import React, { ReactElement, FC } from 'react';

import { Input, Form } from 'antd';

const { Item } = Form;

type FieldType = 'password' | 'number';

interface IField {
  value: any;
  name: string;
  label?: string;
  error?: string;
  type?: FieldType;
  icon?: ReactElement;
  measure?: string;
  placeholder?: string;
  autoComplete?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  onChange: (eventOrPath: string | React.ChangeEvent<any>) => void;
}

const fieldByType = {
  number: Input,
  password: Input.Password
};

const Field: FC<IField> = ({
  value,
  name,
  type,
  label,
  error,
  icon,
  measure,
  placeholder,
  autoComplete,
  isDisabled,
  hasBeenTouched,
  onChange
}) => {
  const SelectedInput = type ? fieldByType[type] : Input;

  return (
    <Item
      label={label}
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
      className="field-item"
    >
      <SelectedInput
        type={type}
        name={name}
        prefix={icon}
        suffix={measure}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
      />
    </Item>
  );
};

export default Field;
