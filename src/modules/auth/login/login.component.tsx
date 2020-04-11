import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookFilled, LoadingOutlined } from '@ant-design/icons';

import { REGISTER } from 'shared/routes';
import { AuthCredentials } from 'shared/model';
import { AuthContext } from 'shared/contexts';

import useStyles from './login.style';

const { Item } = Form;
const { Title, Text } = Typography;

const Login: FC = () => {
  const classes = useStyles();
  const { login, isLoading } = useContext(AuthContext);

  const onSubmit = async (values: any) => {
    if (!isLoading) {
      const credentials = new AuthCredentials(values);
      await login(credentials);
    }
  };

  return (
    <Card className={classes.root} bordered={true}>
      <Form name="normal_login" initialValues={{ remember: true }} onFinish={onSubmit}>
        <Item className="login-form-title">
          <Title level={4}>iForce</Title>
        </Item>
        <Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" disabled={isLoading} />
        </Item>
        <Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            disabled={isLoading}
          />
        </Item>
        <Item>
          <Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Item>

          <Link to="/forgot-password" className="forgot-password">
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
