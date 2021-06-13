import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Card, Typography, Divider } from 'antd';

import { REGISTER_TEXT, ALREADY_HAVE_AN_ACCOUNT_TEXT } from 'modules/auth/auth.module';

import { Icon, Button } from 'shared/modules';
import { LOGIN } from 'shared/routes';
import { AuthService, UserService } from 'shared/services';
import { Field, Select } from 'shared/modules/form';
import {
  FIRST_NAME_TEXT,
  LAST_NAME_TEXT,
  USERNAME_TEXT,
  PHONE_TEXT,
  USER_TYPE_TEXT,
  EMAIL_TEXT,
  PASSWORD_TEXT,
  CONFIRM_PASSWORD_TEXT
} from 'shared/constants';
import { CreateAccount, ICreateAccountFormValues } from 'modules/auth/shared/model';
import { UserType, useCreateUserMutation } from 'shared/generated';

import LOGO from 'shared/assets/images/logo/logo-horizontal-full-color.png';

import { INITIAL_REGISTER_FORM_VALUES, REGISTER_FORM_SCHEMA } from './register.util';

import userStyles from './register.style';

const { Item } = Form;
const { Text } = Typography;

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
          <img src={LOGO} />
        </Item>

        <Field
          icon={<Icon type="user" />}
          name="username"
          placeholder={USERNAME_TEXT}
          value={values.username}
          error={errors.username}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.username}
        />

        <Field
          icon={<Icon type="user" />}
          name="firstName"
          placeholder={FIRST_NAME_TEXT}
          value={values.firstName}
          error={errors.firstName}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.firstName}
        />

        <Field
          icon={<Icon type="user" />}
          name="lastName"
          placeholder={LAST_NAME_TEXT}
          value={values.lastName}
          error={errors.lastName}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.lastName}
        />

        <Field
          icon={<Icon type="phone" />}
          name="phone"
          placeholder={PHONE_TEXT}
          value={values.phone}
          error={errors.phone}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.phone}
        />

        <Select
          value={values.type}
          name="type"
          placeholder={USER_TYPE_TEXT}
          options={[
            { label: UserService.parseUserType(UserType.PersonalTrainer), value: UserType.PersonalTrainer },
            { label: UserService.parseUserType(UserType.Customer), value: UserType.Customer }
          ]}
          error={errors.type}
          isDisabled={isLoading}
          setFieldValue={setFieldValue}
          hasBeenTouched={touched.type}
        />

        <Divider />

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
          <Button type="submit" fullWidth>
            {isLoading ? <Icon type="loading" /> : REGISTER_TEXT}
          </Button>
        </Item>

        <Item className="register-link">
          <Link to={LOGIN}>
            <Text underline>{ALREADY_HAVE_AN_ACCOUNT_TEXT}</Text>
          </Link>
        </Item>
      </Form>
    </Card>
  );
};

export default Register;
