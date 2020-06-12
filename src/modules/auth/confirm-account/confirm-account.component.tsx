import React, { FC, useState, useEffect, useContext } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';

import { useFormik } from 'formik';
import { Form, Button, Card, Typography } from 'antd';
import { SafetyCertificateOutlined, LoadingOutlined, MailOutlined } from '@ant-design/icons';

import { Field } from 'shared/modules/form';
import { AuthService } from 'shared/services';
import { AuthContext } from 'shared/contexts';
import { ICredentials, AuthCredentials } from 'shared/model';

import { INITIAL_CONFIRM_ACCOUNT_FORM_VALUES, CONFIRM_ACCOUNT_FORM_SCHEMA } from './confirm-account.util';
import userStyles from './confirm-account.style';
import { LOGIN } from 'shared/routes';

const { Item } = Form;
const { Title, Text } = Typography;

const ConfirmAccount: FC = () => {
  const classes = userStyles();
  const history = useHistory();
  const location = useLocation<ICredentials>();
  const { login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<ICredentials>({ email: '', password: '' });

  useEffect(() => {
    if (location.state && location.state.email && location.state.password) {
      setCredentials(location.state);
    }
  }, [location]);

  const onSubmit = async ({ email, code }: { email: string; code: string }) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        await AuthService.confirmSignUp(email, code);
        if (!credentials.email && !credentials.password) {
          history.push(LOGIN);
        } else {
          await login(new AuthCredentials(credentials));
        }
      }
    } catch (error) {}

    setIsLoading(false);
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik<{ email: string; code: string }>({
    onSubmit,
    enableReinitialize: true,
    initialValues: { ...INITIAL_CONFIRM_ACCOUNT_FORM_VALUES, email: credentials.email },
    validationSchema: CONFIRM_ACCOUNT_FORM_SCHEMA
  });

  return (
    <Card className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Item className="confirm-account-form-title">
          <Title level={4}>Verificación de correo electrónico</Title>
          <Text>Proporcione el código numérico enviado a su correo electrónico para confirmar su cuenta.</Text>
        </Item>

        <Field
          icon={<MailOutlined />}
          name="email"
          placeholder="Correo Electrónico"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          isDisabled={isLoading || !!credentials.email}
          hasBeenTouched={touched.email}
        />

        <Field
          icon={<SafetyCertificateOutlined />}
          name="code"
          placeholder="Código de verificación"
          value={values.code}
          error={errors.code}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.code}
        />

        <Item className="submit-button">
          <Button type="primary" htmlType="submit" block>
            {isLoading ? <LoadingOutlined /> : 'ENVIAR'}
          </Button>
        </Item>

        <Item className="login-link">
          <Link to={LOGIN}>
            <Text underline>Volver al inicio de sesión</Text>
          </Link>
        </Item>
      </Form>
    </Card>
  );
};

export default ConfirmAccount;
