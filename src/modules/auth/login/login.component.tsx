import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Button, Checkbox, Card, Typography } from 'antd';

import { Icon } from 'shared/modules';
import { Field } from 'shared/modules/form';
import { AuthContext } from 'shared/contexts';
import { AuthCredentials, ICredentials } from 'shared/model';
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
          <Title level={4}>2Train</Title>
        </Item>

        <Field
          icon={<Icon type="mail" />}
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
          icon={<Icon type="lock" />}
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
            {isLoading ? <Icon type="loading" /> : 'LOGIN'}
          </Button>
        </Item>

        <Item className="other-login-options">
          <Button>
            <Icon type="facebook" />
            Facebook
          </Button>
          <Button>
            <Icon type="google" />
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
