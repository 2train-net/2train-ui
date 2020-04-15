import * as Yup from 'yup';

import { UserType } from 'shared/model';
import { ICreateAccountData } from 'modules/auth/shared/model/create-account.model';

export const REGISTER_FORM_SCHEMA = Yup.object().shape<ICreateAccountData>({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(/^(?=.*[@$!%*#?&])/, 'One special case Character')
    .matches(/^(?=.*\d)/, 'One numeric digit')
    .matches(/^(?=.*[a-z])/, 'One lower case letter')
    .matches(/^(?=.*[A-Z])/, 'One upper case letter')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords should match')
    .required('Required'),
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
