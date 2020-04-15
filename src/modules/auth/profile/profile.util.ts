import * as Yup from 'yup';

import { Gender, ICreateProfileData } from 'modules/auth/shared/model';

import { PHONE_REGEX } from 'shared/constants';

export const PROFILE_FORM_SCHEMA = Yup.object().shape<ICreateProfileData>({
  avatar: Yup.string(),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(PHONE_REGEX, 'Phone number is not valid')
    .required('Required'),
  birthday: Yup.string().required('Required'),
  gender: Yup.mixed<Gender>()
    .oneOf([Gender.MALE, Gender.FEMALE])
    .required('Required')
});

export const INITIAL_PROFILE_FORM_VALUES: ICreateProfileData = {
  avatar: '',
  firstName: '',
  lastName: '',
  phone: '',
  birthday: '',
  gender: undefined
};
