import * as Yup from 'yup';

import { IUserProfileForm } from 'modules/profile/shared/model/user-profile.model';
import { EMAIL_FORM_SCHEMA } from 'modules/auth/shared/util';

import { PHONE_REGEX, REQUIRED_EXCEPTION_TEXT, PHONE_NUMBER_EXCEPTION_TEXT } from 'shared/constants';
import { Gender, Scope } from 'shared/generated';

export const PROFILE_FORM_SCHEMA = Yup.object().shape<IUserProfileForm>({
  ...EMAIL_FORM_SCHEMA,
  avatarBase64: Yup.string(),
  username: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  firstName: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  lastName: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  phone: Yup.string()
    .matches(PHONE_REGEX, PHONE_NUMBER_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT),
  birthday: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  gender: Yup.mixed<Gender>().oneOf([Gender.Male, Gender.Female, Gender.NotSpecified]),
  scope: Yup.mixed<Scope>()
    .oneOf([Scope.Private, Scope.Public])
    .required(REQUIRED_EXCEPTION_TEXT)
});
