import React, { ReactElement, FC } from 'react';

import { Input, Form } from 'antd';

const { Item } = Form;

type FieldType = 'password';

interface IField {
  value: any;
  name: string;
  error?: string;
  type?: FieldType;
  icon?: ReactElement;
  placeholder?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  onChange: (eventOrPath: string | React.ChangeEvent<any>) => void;
}

const Field: FC<IField> = ({ value, name, type, error, icon, placeholder, isDisabled, hasBeenTouched, onChange }) => {
  return (
    <Item
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
