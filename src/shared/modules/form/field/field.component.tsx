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
  placeholder?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  onChange: (eventOrPath: string | React.ChangeEvent<any>) => void;
}

const Field: FC<IField> = ({
  value,
  name,
  type,
  label,
  error,
  icon,
  placeholder,
  isDisabled,
  hasBeenTouched,
  onChange
}) => {
  return (
    <Item
      label={label}
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
    >
      <Input
        type={type}
        name={name}
        prefix={icon}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
      />
    </Item>
  );
};

export default Field;
