import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT, INVALID_EMAIL_EXCEPTION_TEXT } from 'shared/constants';

export const FORGOT_PASSWORD_FORM_SCHEMA = Yup.object().shape<{ email: string }>({
  email: Yup.string()
    .email(INVALID_EMAIL_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_FORGOT_PASSWORD_FORM_VALUES = {
  email: ''
};
