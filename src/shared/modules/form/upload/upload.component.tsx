import React, { FC, ReactElement } from 'react';

import { Form, Upload as AntDesignUpload } from 'antd';

const { Item } = Form;

interface IUpload {
  children: ReactElement;
  name: string;
  error?: string;
  className?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const Upload: FC<IUpload> = ({ children, name, error, className, isDisabled, hasBeenTouched, setFieldValue }) => {
  const getBase64 = (file: Blob, callback: (image: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpload = (file: Blob) => {
    getBase64(file, image => {
      if (image && typeof image === 'string') {
        setFieldValue(name, image);
      }
    });

    return false;
  };

  return (
    <Item
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
    >
      <AntDesignUpload
        name={name}
        className={className}
        disabled={isDisabled}
        showUploadList={false}
        listType="picture-card"
        beforeUpload={onUpload}
      >
        {children}
      </AntDesignUpload>
    </Item>
  );
};

export default Upload;
