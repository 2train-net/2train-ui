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
    owner: {
      uuid: string;
      avatar?: string | null;
      firstName: string;
      lastName: string;
    };
  };
  user: {
    uuid: string;
    avatar?: string | null;
    firstName: string;
    lastName: string;
  };
}
