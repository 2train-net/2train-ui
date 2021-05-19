import * as Yup from 'yup';

export interface IPlanAcceptInviteFormValues {
  startAt: string;
}

export const PLAN_ACCEPT_INVITE_FORM_SCHEMA = Yup.object().shape({
  startAt: Yup.string().required('Required')
});
