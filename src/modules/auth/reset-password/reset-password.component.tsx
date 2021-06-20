import React, { FC, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Card, Typography } from 'antd';

import { RESET_PASSWORD_TITLE, RESET_PASSWORD_DESCRIPTION, VERIFICATION_CODE_TEXT } from 'modules/auth/auth.module';

import { Icon, Button } from 'shared/modules';
import { LOGIN } from 'shared/routes';
import { SEND_TEXT, PASSWORD_TEXT, CONFIRM_PASSWORD_TEXT, EMAIL_TEXT } from 'shared/constants';
import { Field } from 'shared/modules/form';
import { AuthService } from 'shared/services';

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
          <Title level={4}>{RESET_PASSWORD_TITLE}</Title>
          <Text>{RESET_PASSWORD_DESCRIPTION}</Text>
        </Item>

        <Field
          icon={<Icon type="mail" />}
          name="email"
          placeholder={EMAIL_TEXT}
          autoComplete="username"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          isDisabled={isLoading || !!email}
          hasBeenTouched={touched.email}
        />

        <Field
          icon={<Icon type="safetyCertificate" />}
          name="code"
          placeholder={VERIFICATION_CODE_TEXT}
          value={values.code}
          error={errors.code}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.code}
        />

        <Field
          icon={<Icon type="lock" />}
          name="password"
          type="password"
          placeholder={PASSWORD_TEXT}
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
          placeholder={CONFIRM_PASSWORD_TEXT}
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.confirmPassword}
        />

        <Item className="submit-button">
          <Button type="submit" loading={isLoading} fullWidth>
            {SEND_TEXT}
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default ResetPassword;
