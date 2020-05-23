import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Button, Checkbox, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookFilled, LoadingOutlined } from '@ant-design/icons';

import { Field } from 'shared/modules/form';
import { AuthCredentials, ICredentials } from 'shared/model';
import { AuthContext } from 'shared/contexts';
import { REGISTER, FORGOT_PASSWORD } from 'shared/routes';

import { LOGIN_FORM_SCHEMA, INITIAL_LOGIN_FORM_VALUES } from './login.util';
import useStyles from './login.style';

const { Item } = Form;
const { Title, Text } = Typography;

const Login: FC = () => {
  const classes = useStyles();
  const { login, isLoading } = useContext(AuthContext);

  const onSubmit = async (values: ICredentials) => {
    if (!isLoading) {
      const credentials = new AuthCredentials(values);
      await login(credentials);
    }
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik<ICredentials>({
    onSubmit,
    initialValues: INITIAL_LOGIN_FORM_VALUES,
    validationSchema: LOGIN_FORM_SCHEMA
  });

  return (
    <Card className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Item className="login-form-title">
          <Title level={4}>iForce</Title>
        </Item>

        <Field
          icon={<MailOutlined />}
          name="email"
          placeholder="Email"
          autoComplete="username"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.email}
        />

        <Field
          icon={<LockOutlined />}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.password}
        />

        <Item>
          <Item name="remember" noStyle>
            <Checkbox checked>Remember me</Checkbox>
          </Item>

          <Link to={FORGOT_PASSWORD} className="forgot-password">
            Forgot password
          </Link>
        </Item>

        <Item className="submit-button">
          <Button type="primary" htmlType="submit" block>
            {isLoading ? <LoadingOutlined /> : 'LOGIN'}
          </Button>
        </Item>

        <Item className="other-login-options">
          <Button>
            <FacebookFilled />
            Facebook
          </Button>
          <Button>
            <GoogleOutlined />
            Google
          </Button>
        </Item>

        <Item className="register-link">
          <Link to={REGISTER}>
            <Text underline>Register now!</Text>
          </Link>
        </Item>
      </Form>
    </Card>
  );
};

export default Login;
