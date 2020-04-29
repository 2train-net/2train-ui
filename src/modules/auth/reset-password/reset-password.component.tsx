import React, { FC, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined, SafetyCertificateOutlined, LoadingOutlined } from '@ant-design/icons';

import { LOGIN } from 'shared/routes';
import { AuthService } from 'shared/services';
import { Field } from 'shared/modules/form';

import {
  INITIAL_RESET_PASSWORD_FORM_VALUES,
  RESET_PASSWORD_FORM_SCHEMA,
  ISubmitResetPasswordData
} from './reset-password.util';
import userStyles from './reset-password.style';

const { Item } = Form;
const { Title, Text } = Typography;

const ResetPassword: FC = () => {
  const classes = userStyles();
  const history = useHistory();
  const location = useLocation<{ email?: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const onSubmit = async ({ email, code, password }: ISubmitResetPasswordData) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        await AuthService.forgotPasswordSubmit(email, code, password);
        history.push(LOGIN);
      }
    } catch (error) {}

    setIsLoading(false);
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik<ISubmitResetPasswordData>({
    onSubmit,
    enableReinitialize: true,
    initialValues: { ...INITIAL_RESET_PASSWORD_FORM_VALUES, email },
    validationSchema: RESET_PASSWORD_FORM_SCHEMA
  });

  return (
    <Card className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Item className="reset-password-form-title">
          <Title level={4}>Reset your password</Title>
          <Text>Tell us your email address and verification code to confirm the password reset</Text>
        </Item>

        <Field
          icon={<MailOutlined />}
          name="email"
          placeholder="Email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          isDisabled={isLoading || !!email}
          hasBeenTouched={touched.email}
        />

        <Field
          icon={<SafetyCertificateOutlined />}
          name="code"
          placeholder="Code"
          value={values.code}
          error={errors.code}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.code}
        />

        <Field
          icon={<LockOutlined />}
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.password}
        />

        <Field
          icon={<LockOutlined />}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.confirmPassword}
        />

        <Item className="submit-button">
          <Button type="primary" htmlType="submit" block>
            {isLoading ? <LoadingOutlined /> : 'SEND'}
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default ResetPassword;
