import React, { FC, useState } from 'react';

import { useFormik } from 'formik';
import { Col, Form, Row, Typography } from 'antd';

import {
  CHANGE_PASSWORD_TEXT,
  CONFIRM_NEW_PASSWORD_TEXT,
  WRONG_OLD_PASSWORD_TEXT,
  YOUR_PASSWORD_WAS_CHANGED_TEXT
} from 'modules/settings/settings.module';

import {
  IConfirmPasswordFormValues,
  CHANGE_PASSWORD_FORM_SCHEMA,
  INITIAL_CHANGE_PASSWORD_FORM_VALUES
} from './change-password.util';

import { Field } from 'shared/modules/form';
import { AuthService } from 'shared/services';
import { Button, Icon, Message } from 'shared/modules';
import { NEW_PASSWORD_TEXT, OLD_PASSWORD_TEXT, SAVE_TEXT } from 'shared/constants';

const { Item } = Form;
const { Title } = Typography;

const ChangePassword: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IConfirmPasswordFormValues) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        await AuthService.changePassword(data.oldPassword, data.password);
        resetForm();
        Message.success(YOUR_PASSWORD_WAS_CHANGED_TEXT);
      }
    } catch (error) {
      console.log(error);
      Message.error(WRONG_OLD_PASSWORD_TEXT);
    }
    setIsLoading(false);
  };

  const { handleSubmit, handleChange, values, errors, touched, resetForm } = useFormik<IConfirmPasswordFormValues>({
    onSubmit,
    initialValues: INITIAL_CHANGE_PASSWORD_FORM_VALUES,
    validationSchema: CHANGE_PASSWORD_FORM_SCHEMA
  });

  return (
    <Form onSubmitCapture={handleSubmit} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Row gutter={24}>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          <Title level={5}>{CHANGE_PASSWORD_TEXT}</Title>
          <br />
          <Field
            icon={<Icon type="lock" />}
            name="oldPassword"
            type="password"
            label={OLD_PASSWORD_TEXT}
            labelTop
            value={values.oldPassword}
            error={errors.oldPassword}
            onChange={handleChange}
            isDisabled={isLoading}
            hasBeenTouched={touched.oldPassword}
          />
          <Field
            icon={<Icon type="lock" />}
            name="password"
            type="password"
            label={NEW_PASSWORD_TEXT}
            labelTop
            autoComplete="new-password"
            value={values.password}
            error={errors.password}
            onChange={handleChange}
            isDisabled={isLoading}
            hasBeenTouched={touched.password}
          />

          <Field
            icon={<Icon type="lock" />}
            name="confirmPassword"
            type="password"
            label={CONFIRM_NEW_PASSWORD_TEXT}
            labelTop
            autoComplete="new-password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            isDisabled={isLoading}
            hasBeenTouched={touched.confirmPassword}
          />

          <Item className="submit-button" style={{ textAlign: 'center' }}>
            <Button type="submit" size="medium" color="secondary" disabled={isLoading} loading={isLoading}>
              {SAVE_TEXT}
            </Button>
          </Item>
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
