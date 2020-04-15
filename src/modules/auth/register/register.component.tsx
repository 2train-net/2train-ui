import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

import { LOGIN } from 'shared/routes';
import { UserType } from 'shared/model';
import { AuthService } from 'shared/services';
import { Field, Select } from 'shared/modules/form';
import { CreateAccount, ICreateAccountData } from 'modules/auth/shared/model';

import { INITIAL_REGISTER_FORM_VALUES, REGISTER_FORM_SCHEMA } from './register.util';
import userStyles from './register.style';

const { Item } = Form;
const { Title, Text } = Typography;

const Register: FC = () => {
  const classes = userStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ICreateAccountData) => {
    try {
      setIsLoading(true);
      await AuthService.register(new CreateAccount(data));
      setIsLoading(false);
      history.push(LOGIN);
    } catch (error) {}
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<ICreateAccountData>({
    onSubmit,
    initialValues: INITIAL_REGISTER_FORM_VALUES,
    validationSchema: REGISTER_FORM_SCHEMA
  });

  return (
    <Card className={classes.root} bordered>
      <Form name="normal_register" onSubmitCapture={handleSubmit}>
        <Item className="register-form-title">
          <Title level={4}>iForce</Title>
        </Item>

        <Select
          value={values.type}
          name="type"
          placeholder="Type"
          options={[
            { label: 'Gym', value: UserType.GYM },
            { label: 'Trainer', value: UserType.TRAINER },
            { label: 'Customer', value: UserType.CUSTOMER }
          ]}
          error={errors.type}
          isDisabled={isLoading}
          setFieldValue={setFieldValue}
          hasBeenTouched={touched.type}
        />

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
            {isLoading ? <LoadingOutlined /> : 'REGISTER'}
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
