import * as Yup from 'yup';

export const CONFIRM_ACCOUNT_FORM_SCHEMA = Yup.object().shape<{ email: string; code: string }>({
  code: Yup.string().required('Required'),
  email: Yup.string().required('Required')
});

export const INITIAL_CONFIRM_ACCOUNT_FORM_VALUES = {
  code: '',
  email: ''
};
