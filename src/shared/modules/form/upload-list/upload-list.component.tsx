import React, { FC, ReactElement } from 'react';

import { Form, Upload as AntDesignUpload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

const { Item } = Form;

type FileItemStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface IFileItem {
  uid: string;
  name: string;
  status: FileItemStatus;
  url: string;
  size: number;
  type: string;
}

interface IUpload {
  children: ReactElement;
  name: string;
  error?: string;
  values: IFileItem[];
  className?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  setFieldValue: (name: string, values: IFileItem[], shouldValidate?: boolean) => void;
}

const Upload: FC<IUpload> = ({
  children,
  name,
  error,
  values,
  className,
  isDisabled,
  hasBeenTouched,
  setFieldValue
}) => {
  const getBase64 = (file: Blob, callback: (avatar: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const onUpload = (info: UploadChangeParam<any>) => {
    getBase64(info.file, image => {
      if (image && typeof image === 'string') {
        setFieldValue(
          name,
          values.concat({
            uid: info.file.uid,
            name: info.file.name,
            status: 'done',
            url: image,
            size: info.file.size,
            type: info.file.type
          })
        );
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
        fileList={values}
        className={className}
        onChange={onUpload}
        showUploadList
        beforeUpload={() => false}
        disabled={isDisabled}
      >
        {children}
      </AntDesignUpload>
    </Item>
  );
};

export default Upload;
