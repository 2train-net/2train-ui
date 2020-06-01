import React, { FC } from 'react';

import moment from 'moment';

import { Form, DatePicker as AntDesignDatePicker } from 'antd';

const { Item } = Form;

interface IDatePicker {
  value?: any;
  name: string;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  disabledDate?: (date: moment.Moment) => boolean;
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const DatePicker: FC<IDatePicker> = ({
  value,
  name,
  error,
  placeholder,
  isDisabled,
  hasBeenTouched,
  disabledDate,
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
      <AntDesignDatePicker
        value={value}
        style={{ width: '100%' }}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        disabledDate={disabledDate}
      />
    </Item>
  );
};

export default DatePicker;
