import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button, Card, Typography, Select } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { LOGIN } from 'shared/routes';

import userStyles from './register.style';

const { Item } = Form;
const { Option } = Select;
const { Title, Text } = Typography;

const Register: FC = () => {
  const classes = userStyles();

  return (
    <Card className={classes.root} bordered={true}>
      <Form name="normal_register" initialValues={{ remember: true }}>
        <Item className="register-form-title">
          <Title level={4}>iForce</Title>
        </Item>
        <Item name="user-type" rules={[{ required: true, message: 'Please input your user type!' }]}>
          <Select defaultValue="customer">
            <Option value="gym">Gym</Option>
            <Option value="trainer">Trainer</Option>
            <Option value="customer">Customer</Option>
          </Select>
        </Item>
        <Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Item>
        <Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Item>
        <Item name="confirm-password" rules={[{ required: true, message: 'Please confirm your password!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm password"
          />
        </Item>
        <Item className="submit-button">
          <Button type="primary" htmlType="submit" block>
            REGISTER
          </Button>
        </Item>

        <Item className="register-link">
          <Link to={LOGIN}>
            <Text underline>Already have an account?</Text>
          </Link>
        </Item>
      </Form>
    </Card>
  );
};

export default Register;
