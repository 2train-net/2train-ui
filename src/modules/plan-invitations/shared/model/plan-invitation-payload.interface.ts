import { IntervalPlan, Currency } from 'shared/generated';

export interface IPlanInvitationPayload {
  uuid: string;
  link?: string | null;
  plan: {
    name: string;
    price: number;
    currency: Currency;
    intervalCount: number;
    intervalPlan: IntervalPlan;
  };
}
