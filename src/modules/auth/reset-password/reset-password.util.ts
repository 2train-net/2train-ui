import * as Yup from 'yup';

import { EMAIL_FORM_SCHEMA, CONFIRM_PASSWORD_FORM_SCHEMA } from 'modules/auth/shared/util';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface ISubmitResetPasswordData {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export const RESET_PASSWORD_FORM_SCHEMA = Yup.object().shape<ISubmitResetPasswordData>({
  ...EMAIL_FORM_SCHEMA,
  ...CONFIRM_PASSWORD_FORM_SCHEMA,
  code: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_RESET_PASSWORD_FORM_VALUES: ISubmitResetPasswordData = {
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
};
