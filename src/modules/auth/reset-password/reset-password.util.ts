import * as Yup from 'yup';

import { EMAIL_FORM_SCHEMA, CONFIRM_PASSWORD_FORM_SCHEMA } from 'modules/auth/shared/util';

export interface ISubmitResetPasswordData {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export const RESET_PASSWORD_FORM_SCHEMA = Yup.object().shape<ISubmitResetPasswordData>({
  ...EMAIL_FORM_SCHEMA,
  ...CONFIRM_PASSWORD_FORM_SCHEMA,
  code: Yup.string().required('Required')
});

export const INITIAL_RESET_PASSWORD_FORM_VALUES: ISubmitResetPasswordData = {
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
};
