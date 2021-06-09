import React, { ReactElement, FC } from 'react';

import { Input, Form } from 'antd';

const { Item } = Form;

const { TextArea } = Input;

interface ITextArea {
  value: any;
  name: string;
  label?: string;
  labelTop?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  onChange: (eventOrPath: string | React.ChangeEvent<any>) => void;
}

const TextAreaField: FC<ITextArea> = ({
  value,
  name,
  label,
  labelTop = false,
  error,
  placeholder,
  autoComplete,
  isDisabled,
  hasBeenTouched,
  onChange
}) => {
  return (
    <Item
      label={label}
      labelCol={labelTop ? { span: 24 } : {}}
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
      className="field-item"
    >
      <TextArea
        autoSize={{ minRows: 3, maxRows: 5 }}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
      />
    </Item>
  );
};

export default TextAreaField;
