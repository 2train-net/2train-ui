import * as Yup from 'yup';

import { EMAIL_FORM_SCHEMA, CONFIRM_PASSWORD_FORM_SCHEMA } from 'modules/auth/shared/util';

import { UserType } from 'shared/generated';
import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';
import { ICreateAccountFormValues } from 'modules/auth/shared/model';

export const REGISTER_FORM_SCHEMA = Yup.object().shape<ICreateAccountFormValues>({
  ...EMAIL_FORM_SCHEMA,
  ...CONFIRM_PASSWORD_FORM_SCHEMA,
  type: Yup.mixed<UserType>()
    .oneOf([UserType.PersonalTrainer, UserType.Customer])
    .required(REQUIRED_EXCEPTION_TEXT),
  username: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  firstName: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  lastName: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  phone: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_REGISTER_FORM_VALUES: ICreateAccountFormValues = {
  type: UserType.PersonalTrainer,
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
};
