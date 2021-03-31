import * as Yup from 'yup';

import { EMAIL_FORM_SCHEMA } from 'modules/auth/shared/util';

export const CONFIRM_ACCOUNT_FORM_SCHEMA = Yup.object().shape<{ email: string; code: string }>({
  ...EMAIL_FORM_SCHEMA,
  code: Yup.string().required('Required')
});

export const INITIAL_CONFIRM_ACCOUNT_FORM_VALUES = {
  code: '',
  email: ''
};
