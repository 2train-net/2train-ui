import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT, INVALID_EMAIL_EXCEPTION_TEXT } from 'shared/constants';

export interface IPlanInviteFormValues {
  email: string;
}

export const PLAN_INVITE_FORM_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email(INVALID_EMAIL_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_PLAN_INVITE_FORM_VALUES: IPlanInviteFormValues = {
  email: ''
};
