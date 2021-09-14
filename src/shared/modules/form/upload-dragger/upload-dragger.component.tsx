import React, { FC } from 'react';

import { Form } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';

import { Icon } from 'shared/modules';
import { DRAG_FILE_TO_THIS_AREA_TEXT, FILE_EXTENSION_REQUIREMENT_TEXT } from 'shared/constants';

import useStyles from './upload-dragger.style';

const { Item } = Form;

const MAX_COUNT_OF_ATTACHED_FILES = 1;

interface IUploadDragger {
  name: string;
  error?: string;
  format?: string;
  className?: string;
  isDisabled?: boolean;
  hasBeenTouched?: boolean;
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const UploadDragger: FC<IUploadDragger> = ({
  name,
  format = '.pdf',
  error,
  className,
  isDisabled,
  hasBeenTouched,
  setFieldValue
}) => {
  const classes = useStyles();

  const getBase64 = (file: Blob, callback: (image: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const onUpload = (file: Blob) => {
    getBase64(file, document => {
      if (document && typeof document === 'string') {
        setFieldValue(name, document);
      }
    });

    return false;
  };

  return (
    <Item
      className={classes.root}
      hasFeedback={hasBeenTouched}
      help={!!error && hasBeenTouched ? error : null}
      validateStatus={!!error && hasBeenTouched ? 'error' : 'success'}
    >
      <Dragger
        name={name}
        accept={format}
        multiple={false}
        className={className}
        disabled={isDisabled}
        beforeUpload={onUpload}
        maxCount={MAX_COUNT_OF_ATTACHED_FILES}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{DRAG_FILE_TO_THIS_AREA_TEXT}</p>
        <p className="ant-upload-hint">{`${FILE_EXTENSION_REQUIREMENT_TEXT} ${format}`}</p>
      </Dragger>
    </Item>
  );
};

export default UploadDragger;
