import * as Yup from 'yup';

import { UserType } from 'shared/model';
import { ICreateAccountData } from 'modules/auth/shared/model';
import { EMAIL_FORM_SCHEMA, CONFIRM_PASSWORD_FORM_SCHEMA } from 'modules/auth/shared/util';

export const REGISTER_FORM_SCHEMA = Yup.object().shape<ICreateAccountData>({
  ...EMAIL_FORM_SCHEMA,
  ...CONFIRM_PASSWORD_FORM_SCHEMA,
  type: Yup.mixed<UserType>()
    .oneOf([UserType.GYM, UserType.TRAINER, UserType.CUSTOMER])
    .required('Required')
});

export const INITIAL_REGISTER_FORM_VALUES: ICreateAccountData = {
  type: UserType.CUSTOMER,
  email: '',
  password: '',
  confirmPassword: ''
};
