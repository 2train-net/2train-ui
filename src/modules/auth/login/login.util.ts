import * as Yup from 'yup';

export const LOGIN_FORM_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(/^(?=.*[@$!%*#?&])/, 'One special case Character')
    .matches(/^(?=.*\d)/, 'One numeric digit')
    .matches(/^(?=.*[a-z])/, 'One lower case letter')
    .matches(/^(?=.*[A-Z])/, 'One upper case letter')
    .required('Required')
});

export const INITIAL_LOGIN_FORM_VALUES = {
  email: '',
  password: ''
};
