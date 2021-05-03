import * as Yup from 'yup';

export interface IPlanInviteFormValues {
  email: string;
}

export const PLAN_INVITE_FORM_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

export const INITIAL_PLAN_INVITE_FORM_VALUES: IPlanInviteFormValues = {
  email: ''
};
