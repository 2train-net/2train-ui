import React, { FC } from 'react';

import { FormikErrors, FormikTouched } from 'formik';
import { Form, Button } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import Upload from 'shared/modules/form/upload-list/upload-list.component';

import { IUploadBodyPicturesData } from './upload-body-pictures.util';

const { Item } = Form;

interface IUploadBodyPictures {
  isLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: (name: string, values: any) => void;
  values: IUploadBodyPicturesData;
  errors?: FormikErrors<IUploadBodyPicturesData>;
  touched?: FormikTouched<IUploadBodyPicturesData>;
}

const UploadBodyPictures: FC<IUploadBodyPictures> = ({ isLoading, handleSubmit, setFieldValue, values }) => {
  return (
    <Form onSubmitCapture={handleSubmit}>
      <Item className="profile-form-title">
        <Upload name="images" values={values.images} setFieldValue={setFieldValue}>
          {
            <>
              <PlusOutlined />
              <p>Avatar</p>
            </>
          }
        </Upload>
      </Item>
      <Item className="submit-button">
        <Button type="primary" htmlType="submit">
          {isLoading ? <LoadingOutlined /> : 'SUBMIT'}
        </Button>
      </Item>
    </Form>
  );
};

export default UploadBodyPictures;
