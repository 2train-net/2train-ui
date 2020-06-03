import * as Yup from 'yup';

import { IGymProfileForm } from 'modules/profile/shared/model';

import { PHONE_REGEX } from 'shared/constants';

export const GYM_PROFILE_FORM_SCHEMA = Yup.object().shape<IGymProfileForm>({
  avatarBase64: Yup.string(),
  name: Yup.string().required('Required'),
  phone: Yup.string().matches(PHONE_REGEX, 'Phone number is not valid')
});
