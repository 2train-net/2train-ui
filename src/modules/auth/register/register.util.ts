import * as Yup from 'yup';

import { UserType } from 'shared/generated';
import { ICreateAccountFormValues } from 'modules/auth/shared/model';
import { EMAIL_FORM_SCHEMA, CONFIRM_PASSWORD_FORM_SCHEMA } from 'modules/auth/shared/util';

export const REGISTER_FORM_SCHEMA = Yup.object().shape<ICreateAccountFormValues>({
  ...EMAIL_FORM_SCHEMA,
  ...CONFIRM_PASSWORD_FORM_SCHEMA,
  type: Yup.mixed<UserType>()
    .oneOf([UserType.PersonalTrainer, UserType.Customer])
    .required('Required'),
  username: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phone: Yup.string().required('Required')
});

export const INITIAL_REGISTER_FORM_VALUES: ICreateAccountFormValues = {
  type: UserType.Customer,
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
};
