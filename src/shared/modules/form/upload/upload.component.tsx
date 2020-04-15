import React, { FC, ReactElement } from 'react';

import { Form, Upload as AntDesignUpload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

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
  const getBase64 = (file: Blob, callback: (avatar: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const onUpload = (info: UploadChangeParam<any>) => {
    getBase64(info.file, image => {
      if (image && typeof image === 'string') {
        setFieldValue(name, image);
      }
    });
  };

  return (
    <Item
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
      help={!!error && hasBeenTouched ? error : null}
      hasFeedback={hasBeenTouched}
    >
      <AntDesignUpload
        name={name}
        listType="picture-card"
        className={className}
        onChange={onUpload}
        showUploadList={false}
        beforeUpload={() => false}
        disabled={isDisabled}
      >
        {children}
      </AntDesignUpload>
    </Item>
  );
};

export default Upload;
