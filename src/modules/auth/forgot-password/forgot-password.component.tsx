import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Button, Card, Typography } from 'antd';
import { MailOutlined, LoadingOutlined } from '@ant-design/icons';

import { LOGIN } from 'shared/routes';
import { AuthService } from 'shared/services';
import { Field } from 'shared/modules/form';

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
        setIsLoading(false);
        history.push(LOGIN);
      }
    } catch (error) {}
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
          <Title level={4}>Forgot your password?</Title>
          <Text>Tell us your email address to request a password reset</Text>
        </Item>

        <Field
          icon={<MailOutlined />}
          name="email"
          placeholder="Email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.email}
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

export default ForgotPassword;
