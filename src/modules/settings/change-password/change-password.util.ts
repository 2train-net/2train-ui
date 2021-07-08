import * as Yup from 'yup';

import { CONFIRM_PASSWORD_FORM_SCHEMA } from 'modules/auth/shared/util';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface IConfirmPasswordFormValues {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export const CHANGE_PASSWORD_FORM_SCHEMA = Yup.object().shape<IConfirmPasswordFormValues>({
  ...CONFIRM_PASSWORD_FORM_SCHEMA,
  oldPassword: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_CHANGE_PASSWORD_FORM_VALUES: IConfirmPasswordFormValues = {
  oldPassword: '',
  password: '',
  confirmPassword: ''
};
