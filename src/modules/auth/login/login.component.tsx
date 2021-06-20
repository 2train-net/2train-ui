import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Checkbox, Card, Typography } from 'antd';

import { LOGIN_TEXT, FORGOT_PASSWORD_TITLE, REMEMBER_ME, REGISTER_ME } from 'modules/auth/auth.module';

import { Icon, Button } from 'shared/modules';
import { Field } from 'shared/modules/form';
import { AuthContext } from 'shared/contexts';
import { AuthCredentials, ICredentials } from 'shared/model';
import { EMAIL_TEXT, PASSWORD_TEXT } from 'shared/constants';
import { REGISTER, FORGOT_PASSWORD } from 'shared/routes';

import LOGO from 'shared/assets/images/logo/logo-horizontal-full-color.png';

import { LOGIN_FORM_SCHEMA, INITIAL_LOGIN_FORM_VALUES } from './login.util';

import useStyles from './login.style';

const { Item } = Form;
const { Text } = Typography;

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
          <img src={LOGO} />
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

        <Item>
          <Item name="remember" noStyle>
            <Checkbox checked>{REMEMBER_ME}</Checkbox>
          </Item>

          <Link to={FORGOT_PASSWORD} className="forgot-password">
            {FORGOT_PASSWORD_TITLE}
          </Link>
        </Item>

        <Item className="submit-button">
          <Button type="submit" loading={isLoading} fullWidth>
            {LOGIN_TEXT}
          </Button>
        </Item>

        <Item className="register-link">
          <Link to={REGISTER}>
            <Text underline>{REGISTER_ME}</Text>
          </Link>
        </Item>
      </Form>
    </Card>
  );
};

export default Login;
