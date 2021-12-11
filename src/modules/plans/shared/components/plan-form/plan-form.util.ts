import * as Yup from 'yup';

import { NUMBER_TYPE_EXCEPTION_TEXT, REQUIRED_EXCEPTION_TEXT } from 'shared/constants';
import { Currency, IntervalPlan, PlanStatus } from 'shared/generated';

export enum PlanFocus {
  EXERCISES,
  NUTRITIONAL,
  BOTH
}

export interface IPlanFormValues {
  name: string;
  price: number;
  status: PlanStatus;
  currency: Currency;
  intervalCount: number;
  intervalPlan: IntervalPlan;
  description?: string | null;
  focus: PlanFocus;
  isDietPlanEnabled?: boolean;
  isExercisesPlanEnabled?: boolean;
}

export const PLAN_FORM_SCHEMA = Yup.object().shape({
  name: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  description: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  price: Yup.number()
    .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT),
  currency: Yup.mixed<Currency>()
    .oneOf([Currency.Crc, Currency.Us])
    .required(REQUIRED_EXCEPTION_TEXT),
  intervalCount: Yup.number()
    .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT),
  intervalPlan: Yup.mixed<IntervalPlan>()
    .oneOf([IntervalPlan.Day, IntervalPlan.Week, IntervalPlan.Month, IntervalPlan.Year])
    .required(REQUIRED_EXCEPTION_TEXT),
  status: Yup.mixed<PlanStatus>()
    .oneOf([PlanStatus.Active, PlanStatus.Inactive])
    .required(REQUIRED_EXCEPTION_TEXT),
  focus: Yup.mixed<PlanFocus>()
    .oneOf([PlanFocus.EXERCISES, PlanFocus.NUTRITIONAL, PlanFocus.BOTH])
    .required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_PLAN_FORM_VALUES: IPlanFormValues = {
  name: '',
  description: '',
  price: 0,
  currency: Currency.Crc,
  intervalCount: 1,
  intervalPlan: IntervalPlan.Month,
  status: PlanStatus.Active,
  focus: PlanFocus.BOTH
};

export const parsePlanFocusToFlags = {
  [PlanFocus.EXERCISES]: {
    isDietPlanEnabled: false,
    isExercisesPlanEnabled: true
  },
  [PlanFocus.NUTRITIONAL]: {
    isDietPlanEnabled: true,
    isExercisesPlanEnabled: false
  },
  [PlanFocus.BOTH]: {
    isDietPlanEnabled: true,
    isExercisesPlanEnabled: true
  }
};

export const parseFlagsToPlanFocus = (isExercisesPlanEnabled: boolean, isDietPlanEnabled: boolean) => {
  if (isExercisesPlanEnabled && isDietPlanEnabled) {
    return PlanFocus.BOTH;
  } else if (isExercisesPlanEnabled) {
    return PlanFocus.EXERCISES;
  } else {
    return PlanFocus.NUTRITIONAL;
  }
};
