import { Currency, IntervalPlan, PlanStatus, Scope } from 'shared/generated/graphql-schema';

export interface IPlanPayload {
  uuid: string;
  price: number;
  currency: Currency;
  description?: string | null;
  intervalCount: number;
  intervalPlan: IntervalPlan;
  status: PlanStatus;
  scope: Scope;
}
