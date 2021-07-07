import React, { FC, useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

import { useFormik } from 'formik';
import { Form, Card, Typography, Divider } from 'antd';

import {
  REGISTER_TEXT,
  ALREADY_HAVE_AN_ACCOUNT_TEXT,
  USERNAME_ALREADY_EXISTS_EXCEPTION_TEXT,
  UNEXPECTED_VALIDATION_ERROR_EXCEPTION_TEXT
} from 'modules/auth/auth.module';

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
  CONFIRM_PASSWORD_TEXT,
  EMAIL_ALREADY_EXITS_EXCEPTION_TEXT
} from 'shared/constants';
import { CreateAccount, ICreateAccountFormValues } from 'modules/auth/shared/model';
import { UserType, useCreateUserMutation, usePublicUserLazyQuery } from 'shared/generated';

import LOGO from 'shared/assets/images/logo/logo-horizontal-full-color.png';

import { INITIAL_REGISTER_FORM_VALUES, REGISTER_FORM_SCHEMA } from './register.util';

import userStyles from './register.style';

const { Item } = Form;
const { Text } = Typography;

const DEBOUNCE_TIMEOUT = 2000;

const Register: FC = () => {
  const classes = userStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [createUser] = useCreateUserMutation();

  const [getUserByEmail, emailValidationPayload] = usePublicUserLazyQuery({ fetchPolicy: 'network-only' });
  const [getUserByUsername, usernameValidationPayload] = usePublicUserLazyQuery({ fetchPolicy: 'network-only' });

  const validationErrors = !!(
    emailValidationPayload.error?.graphQLErrors.length || usernameValidationPayload.error?.graphQLErrors.length
  );

  const checkEmailExists = useCallback(
    debounce(async (email: string) => {
      try {
        if (email.length) {
          await getUserByEmail({ variables: { where: { email } } });
        }
      } catch (error) {}
    }, DEBOUNCE_TIMEOUT),
    []
  );

  const checkUsernameExists = useCallback(
    debounce(async (username: string) => {
      try {
        if (username.length) {
          await getUserByUsername({ variables: { where: { username } } });
        }
      } catch (error) {}
    }, DEBOUNCE_TIMEOUT),
    []
  );

  const onSubmit = async (data: ICreateAccountFormValues) => {
    try {
      if (!isLoading && !validationErrors) {
        setIsLoading(true);

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
    } catch (error) {}

    setIsLoading(false);
  };

  const validate = () => {
    const validation: { email?: string; username?: string } = {};

    if (values.email && values.email.length > 1 && !errors.email) {
      const emailValidationError = getEmailValidationError();

      if (emailValidationError) {
        validation.email = emailValidationError;
      }
    }

    if (values.username && values.username.length > 1 && !errors.username) {
      const usernameValidationError = getUsernameValidationError();

      if (usernameValidationError) {
        validation.username = usernameValidationError;
      }
    }

    return validation;
  };

  const { handleSubmit, handleChange, setFieldValue, setFieldError, values, errors, touched } = useFormik<
    ICreateAccountFormValues
  >({
    onSubmit,
    validate,
    validationSchema: REGISTER_FORM_SCHEMA,
    initialValues: INITIAL_REGISTER_FORM_VALUES
  });

  const getEmailValidationError = (): string | undefined => {
    const existingEmailError = emailValidationPayload.data?.payload ? EMAIL_ALREADY_EXITS_EXCEPTION_TEXT : undefined;

    return values?.email?.length > 1 && !errors.email ? existingEmailError : errors.email;
  };

  const getUsernameValidationError = (): string | undefined => {
    const existingUsernameError = usernameValidationPayload.data?.payload
      ? USERNAME_ALREADY_EXISTS_EXCEPTION_TEXT
      : undefined;

    return values?.username?.length > 1 && !errors.username ? existingUsernameError : errors.username;
  };

  useEffect(() => {
    checkEmailExists.cancel();
    checkEmailExists(values.email);
  }, [values.email]);

  useEffect(() => {
    checkUsernameExists.cancel();
    checkUsernameExists(values.username);
  }, [values.username]);

  useEffect(() => {
    setFieldError('email', getEmailValidationError());
  }, [emailValidationPayload.data?.payload]);

  useEffect(() => {
    setFieldError('username', getUsernameValidationError());
  }, [usernameValidationPayload.data?.payload]);

  return (
    <Card className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Item className="register-form-title">
          <img src={LOGO} />
        </Item>

        <Field
          clearable
          icon={<Icon type="user" />}
          name="username"
          placeholder={USERNAME_TEXT}
          value={values.username}
          error={errors.username}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.username || errors.username === USERNAME_ALREADY_EXISTS_EXCEPTION_TEXT}
          suffix={usernameValidationPayload.loading && <Icon type="loading" />}
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
          clearable
          icon={<Icon type="mail" />}
          name="email"
          placeholder={EMAIL_TEXT}
          autoComplete="username"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.email || errors.email === EMAIL_ALREADY_EXITS_EXCEPTION_TEXT}
          suffix={emailValidationPayload.loading && <Icon type="loading" />}
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

        {validationErrors && (
          <Item>
            <Typography.Text className="unexpected-error">{UNEXPECTED_VALIDATION_ERROR_EXCEPTION_TEXT}</Typography.Text>
          </Item>
        )}

        <Item className="submit-button">
          <Button type="submit" loading={isLoading} disabled={!!validationErrors} fullWidth>
            {REGISTER_TEXT}
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
