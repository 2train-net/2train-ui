import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Card, Typography } from 'antd';

import { FORGOT_PASSWORD_TITLE, FORGOT_PASSWORD_DESCRIPTION } from 'modules/auth/auth.module';

import { Icon, Button } from 'shared/modules';
import { Field } from 'shared/modules/form';
import { SEND_TEXT, EMAIL_TEXT } from 'shared/constants';
import { AuthService } from 'shared/services';
import { RESET_PASSWORD } from 'shared/routes';

import { INITIAL_FORGOT_PASSWORD_FORM_VALUES, FORGOT_PASSWORD_FORM_SCHEMA } from './forgot-password.util';

import userStyles from './forgot-password.style';

const { Item } = Form;
const { Title, Text } = Typography;

const ForgotPassword: FC = () => {
  const classes = userStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        await AuthService.forgotPassword(email);
        history.push(RESET_PASSWORD, { email });
      }
    } catch (error) {}

    setIsLoading(false);
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik<{ email: string }>({
    onSubmit,
    initialValues: INITIAL_FORGOT_PASSWORD_FORM_VALUES,
    validationSchema: FORGOT_PASSWORD_FORM_SCHEMA
  });

  return (
    <Card className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Item className="forgot-password-form-title">
          <Title level={4}>{FORGOT_PASSWORD_TITLE}</Title>
          <Text>{FORGOT_PASSWORD_DESCRIPTION}</Text>
        </Item>

        <Field
          icon={<Icon type="mail" />}
          name="email"
          placeholder={EMAIL_TEXT}
          autoComplete="username"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.email}
        />

        <Item className="submit-button">
          <Button type="submit" fullWidth>
            {isLoading ? <Icon type="loading" /> : SEND_TEXT}
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
