import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Button, Card, Typography, Divider } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

import { LOGIN } from 'shared/routes';
import { AuthService } from 'shared/services';
import { Field, Select } from 'shared/modules/form';
import { CreateAccount, ICreateAccountFormValues } from 'modules/auth/shared/model';
import { UserType, useCreateUserMutation } from 'shared/generated/graphql-schema';

import { INITIAL_REGISTER_FORM_VALUES, REGISTER_FORM_SCHEMA } from './register.util';
import userStyles from './register.style';

const { Item } = Form;
const { Title, Text } = Typography;

const Register: FC = () => {
  const classes = userStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [createUser] = useCreateUserMutation();

  const onSubmit = async (data: ICreateAccountFormValues) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        // TODO WE SHOULD CHECK FOR THE USERNAMES ON THE APP, JUST TO DOUBLE CHECK USERNAME DOES EXIST
        const profile = new CreateAccount(data);
        const { email, password } = profile.credentials;

        await AuthService.register(email, password);
        await createUser({
          variables: {
            data: profile.data
          }
        });

        history.push(LOGIN);
      }
    } catch (error) {
      // TODO WE SHOULD DO SOME ERROR HANDLER TO NOTIFY USER SOMETHING WENT WRONG
    }

    setIsLoading(false);
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<ICreateAccountFormValues>({
    onSubmit,
    initialValues: INITIAL_REGISTER_FORM_VALUES,
    validationSchema: REGISTER_FORM_SCHEMA
  });

  return (
    <Card className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Item className="register-form-title">
          <Title level={4}>2Train</Title>
        </Item>

        <Field
          icon={<UserOutlined />}
          name="username"
          placeholder="Username"
          value={values.username}
          error={errors.username}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.username}
        />

        <Field
          icon={<UserOutlined />}
          name="firstName"
          placeholder="First name"
          value={values.firstName}
          error={errors.firstName}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.firstName}
        />

        <Field
          icon={<UserOutlined />}
          name="lastName"
          placeholder="Last name"
          value={values.lastName}
          error={errors.lastName}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.lastName}
        />

        <Field
          icon={<PhoneOutlined />}
          name="phone"
          placeholder="Phone"
          value={values.phone}
          error={errors.phone}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.phone}
        />

        <Select
          value={values.type}
          name="type"
          placeholder="Type"
          options={[
            { label: 'Trainer', value: UserType.PersonalTrainer },
            { label: 'Customer', value: UserType.Customer }
          ]}
          error={errors.type}
          isDisabled={isLoading}
          setFieldValue={setFieldValue}
          hasBeenTouched={touched.type}
        />

        <Divider />

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

        <Field
          icon={<LockOutlined />}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
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
