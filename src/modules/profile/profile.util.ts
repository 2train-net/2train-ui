import { EMAIL_FORM_SCHEMA } from 'modules/auth/shared/util';
import * as Yup from 'yup';

import { PHONE_REGEX } from 'shared/constants';
import { Gender } from 'shared/generated/graphql-schema';

export const PROFILE_FORM_SCHEMA = Yup.object().shape<any>({
  ...EMAIL_FORM_SCHEMA,
  avatar: Yup.string(),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(PHONE_REGEX, 'Phone number is not valid')
    .required('Required'),
  birthday: Yup.string().required('Required'),
  gender: Yup.mixed<Gender>()
    .oneOf([Gender.Male, Gender.Female])
    .required('Required')
});

export const INITIAL_PROFILE_FORM_VALUES: any = {
  avatar: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  birthday: '',
  gender: undefined
};
