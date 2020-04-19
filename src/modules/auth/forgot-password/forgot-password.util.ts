import * as Yup from 'yup';

export const FORGOT_PASSWORD_FORM_SCHEMA = Yup.object().shape<{ email: string }>({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

export const INITIAL_FORGOT_PASSWORD_FORM_VALUES = {
  email: ''
};
