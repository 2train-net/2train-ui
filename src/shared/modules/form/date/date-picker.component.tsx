import React, { FC } from 'react';

import moment, { Moment } from 'moment';

import { Form, DatePicker as AntDesignDatePicker } from 'antd';
import { DEFAULT_DATE_FORMAT } from 'shared/constants';

const { Item } = Form;

interface IDatePicker {
  value?: string;
  name: string;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  hasFeedback?: boolean;
  format?: string;
  feedback?: string;
  disabledDate?: {
    date?: string | 'today';
    condition: 'isBefore' | 'isAfter';
  };
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const DatePicker: FC<IDatePicker> = ({
  value,
  name,
  error,
  feedback,
  placeholder,
  isDisabled,
  disabledDate,
  hasBeenTouched,
  hasFeedback,
  format = DEFAULT_DATE_FORMAT,
  setFieldValue
}) => {
  const onChange = (value: any) => {
    const date: Moment = value;

    setFieldValue(name, date ? date.format(format) : '');
  };

  const handleDisableDate = (date: Moment) => {
    const matchDate = disabledDate?.date === 'today' ? moment(new Date(), format) : moment(disabledDate?.date, format);

    return !date || date[disabledDate?.condition!](matchDate);
  };

  return (
    <Item
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : feedback}
      hasFeedback={hasFeedback || hasBeenTouched}
    >
      <AntDesignDatePicker
        format={format}
        value={value ? moment(value, format) : undefined}
        style={{ width: '100%' }}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        disabledDate={disabledDate ? handleDisableDate : undefined}
      />
    </Item>
  );
};

export default DatePicker;
