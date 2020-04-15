import React, { FC } from 'react';

import { Form, DatePicker as AntDesignDatePicker } from 'antd';

const { Item } = Form;

interface IDatePicker {
  name: string;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const DatePicker: FC<IDatePicker> = ({ name, error, placeholder, isDisabled, hasBeenTouched, setFieldValue }) => {
  const onChange = (value: any) => {
    console.log(value);
    setFieldValue(name, value);
  };

  return (
    <Item
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
    >
      <AntDesignDatePicker
        style={{ width: '100%' }}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
      />
    </Item>
  );
};

export default DatePicker;
