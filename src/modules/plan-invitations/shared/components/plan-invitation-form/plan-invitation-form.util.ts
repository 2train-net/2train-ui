import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT, INVALID_EMAIL_EXCEPTION_TEXT } from 'shared/constants';

export enum InvitationType {
  PAID_PLAN,
}

export interface IPlanInvitationFormValues {
  uuid?: string;
  invitationType?: InvitationType;
  email: string;
  firstName: string;
  lastName: string;
  isNewUser: boolean;
  startAt: string;
}

export const PLAN_INVITATION_FORM_SCHEMA = Yup.object().shape({
  uuid: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  invitationType: Yup.mixed<InvitationType>().oneOf([InvitationType.PAID_PLAN]),
  email: Yup.string().email(INVALID_EMAIL_EXCEPTION_TEXT).required(REQUIRED_EXCEPTION_TEXT),
  isNewUser: Yup.boolean(),
  startAt: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  firstName: Yup.string().when('isNewUser', {
    is: true,
    then: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  }),
  lastName: Yup.string().when('isNewUser', {
    is: true,
    then: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  }),
});

export const INITIAL_PLAN_INVITATION_FORM_VALUES: IPlanInvitationFormValues = {
  uuid: '',
  invitationType: InvitationType.PAID_PLAN,
  email: '',
  firstName: '',
  lastName: '',
  isNewUser: false,
  startAt: '',
};
