import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

import { EMAIL_FORM_SCHEMA } from 'modules/auth/shared/util';

export const CONFIRM_ACCOUNT_FORM_SCHEMA = Yup.object().shape<{ email: string; code: string }>({
  ...EMAIL_FORM_SCHEMA,
  code: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_CONFIRM_ACCOUNT_FORM_VALUES = {
  code: '',
  email: ''
};
