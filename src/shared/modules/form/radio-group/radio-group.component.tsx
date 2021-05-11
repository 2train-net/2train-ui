import React, { FC } from 'react';

import { Form, Radio } from 'antd';

interface ISelectOption {
  value: any;
  label: string;
}

interface IRadioGroup {
  value?: any;
  name: string;
  options: ISelectOption[];
  error?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const { Item } = Form;

const RadioGroup: FC<IRadioGroup> = ({ value, name, options, error, isDisabled, hasBeenTouched, setFieldValue }) => {
  const onChange = ({ target: { value } }: any) => {
    setFieldValue(name, value);
  };

  return (
    <Item
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
    >
      <Radio.Group
        name={name}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
        style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
      >
        {options.map(({ label, value }) => (
          <Radio.Button key={value} value={value}>
            {label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Item>
  );
};

export default RadioGroup;
