import { Currency, IntervalPlan, PlanStatus } from 'shared/generated/graphql-schema';

export interface IPlanPayload {
  uuid: string;
  name: string;
  price: number;
  currency: Currency;
  intervalCount: number;
  intervalPlan: IntervalPlan;
  status: PlanStatus;
}
