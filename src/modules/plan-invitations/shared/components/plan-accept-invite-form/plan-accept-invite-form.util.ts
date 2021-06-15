import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface IPlanAcceptInviteFormValues {
  startAt: string;
}

export const PLAN_ACCEPT_INVITE_FORM_SCHEMA = Yup.object().shape({
  startAt: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});
