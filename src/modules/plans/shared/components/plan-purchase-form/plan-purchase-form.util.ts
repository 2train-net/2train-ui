import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface IPlanPurchaseFormValues {
  startAt: string;
}

export const PLAN_PURCHASE_FORM_SCHEMA = Yup.object().shape({
  startAt: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});
