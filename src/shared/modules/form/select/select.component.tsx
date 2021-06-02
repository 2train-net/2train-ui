import React, { FC } from 'react';

import { Form, Select, SelectProps } from 'antd';

const { Item } = Form;
const { Option } = Select;

export interface ISelectOption {
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
  defaultValue?: number;
  isMultiple?: boolean;
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const Field: FC<ISelect> = ({
  value,
  name,
  options,
  error,
  placeholder,
  isDisabled,
  isMultiple,
  hasBeenTouched,
  defaultValue,
  setFieldValue
}) => {
  const props: SelectProps<any> = {};

  if (isMultiple) {
    props.mode = 'multiple';
  }

  const onChange = (value: any) => {
    setFieldValue(name, value);
  };

  return (
    <Item
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
      className="select-item"
    >
      <Select
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        filterOption={(input, option) => {
          const label = option?.label as string;

          return label.toLowerCase().indexOf(input?.toLowerCase()) >= 0;
        }}
        {...props}
      >
        {options.map(({ value, label }) => (
          <Option key={value} value={value} label={label}>
            {label}
          </Option>
        ))}
      </Select>
    </Item>
  );
};

export default Field;
