import React, { ReactElement, FC } from 'react';

import { Input, Form } from 'antd';

import { ONLY_NUMBERS_REGEX, POSITIVE_NUMBER_REGEX } from 'shared/constants';

const { Item } = Form;

type FieldType = 'password' | 'number';

interface IField {
  value: any;
  name: string;
  label?: string;
  labelTop?: boolean;
  error?: string;
  type?: FieldType;
  icon?: ReactElement;
  suffix?: any;
  allowsNegative?: boolean;
  placeholder?: string;
  autoComplete?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  clearable?: boolean;
  onChange?: (eventOrPath: React.ChangeEvent<any>) => void;
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
  labelTop = false,
  error,
  icon,
  suffix,
  allowsNegative = false,
  placeholder,
  autoComplete,
  isDisabled,
  hasBeenTouched,
  clearable = false,
  onChange
}) => {
  const SelectedInput = type ? fieldByType[type] : Input;

  const handleChange = (event: React.ChangeEvent<any>) => {
    if (type === 'number') {
      const value = event.target.value;
      const check = allowsNegative ? ONLY_NUMBERS_REGEX.test(value) : POSITIVE_NUMBER_REGEX.test(value);
      if (event.target.value === '' || check) {
        onChange && onChange(event);
      }
    } else {
      onChange && onChange(event);
    }
  };

  return (
    <Item
      label={label}
      labelCol={labelTop ? { span: 24 } : {}}
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
      className="field-item"
    >
      <SelectedInput
        allowClear={clearable}
        type={type}
        name={name}
        prefix={icon}
        suffix={suffix}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={handleChange}
        value={value}
        autoComplete={autoComplete}
      />
    </Item>
  );
};

export default Field;
