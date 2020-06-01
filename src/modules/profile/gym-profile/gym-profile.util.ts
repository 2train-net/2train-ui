import * as Yup from 'yup';

import { IGymProfileForm } from 'modules/profile/shared/model/gym-profile.model';
import { EMAIL_FORM_SCHEMA } from 'modules/auth/shared/util';

import { PHONE_REGEX } from 'shared/constants';
import { Gender } from 'shared/generated/graphql-schema';

export const PROFILE_FORM_SCHEMA = Yup.object().shape<IGymProfileForm>({
  ...EMAIL_FORM_SCHEMA,
  avatarBase64: Yup.string(),
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
