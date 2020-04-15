import React, { FC } from 'react';

import { Form, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

interface ISelectOption {
  value: any;
  label: string;
}

interface ISelect {
  value?: any;
  name: string;
  options: ISelectOption[];
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const Field: FC<ISelect> = ({
  value,
  name,
  options,
  error,
  placeholder,
  isDisabled,
  hasBeenTouched,
  setFieldValue
}) => {
  const onChange = (value: any) => {
    setFieldValue(name, value);
  };

  return (
    <Item
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
    >
      <Select placeholder={placeholder} disabled={isDisabled} onChange={onChange} value={value}>
        {options.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </Item>
  );
};

export default Field;
