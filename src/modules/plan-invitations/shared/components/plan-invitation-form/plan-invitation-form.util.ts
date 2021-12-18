import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT, INVALID_EMAIL_EXCEPTION_TEXT } from 'shared/constants';

export interface IPlanInvitationFormValues {
  uuid?: string;
  email: string;
}

export const PLAN_INVITATION_FORM_SCHEMA = Yup.object().shape({
  uuid: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  email: Yup.string()
    .email(INVALID_EMAIL_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_PLAN_INVITATION_FORM_VALUES: IPlanInvitationFormValues = {
  email: ''
};
