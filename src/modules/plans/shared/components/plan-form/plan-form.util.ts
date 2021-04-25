import * as Yup from 'yup';

import { Currency, IntervalPlan, PlanStatus } from 'shared/generated';

export interface IPlanFormValues {
  name: string;
  price: number;
  status: PlanStatus;
  currency: Currency;
  intervalCount: number;
  intervalPlan: IntervalPlan;
  description?: string | null;
}

export const PLAN_FORM_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  currency: Yup.mixed<Currency>()
    .oneOf([Currency.Crc, Currency.Us])
    .required('Required'),
  intervalCount: Yup.number().required('Required'),
  intervalPlan: Yup.mixed<IntervalPlan>()
    .oneOf([IntervalPlan.Day, IntervalPlan.Week, IntervalPlan.Month, IntervalPlan.Year])
    .required('Required'),
  status: Yup.mixed<PlanStatus>()
    .oneOf([PlanStatus.Active, PlanStatus.Inactive])
    .required('Required')
});

export const INITIAL_PLAN_FORM_VALUES: IPlanFormValues = {
  name: '',
  description: '',
  price: 0,
  currency: Currency.Crc,
  intervalCount: 1,
  intervalPlan: IntervalPlan.Month,
  status: PlanStatus.Active
};
