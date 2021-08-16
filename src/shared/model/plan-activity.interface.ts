import { PlanActivityType, DocumentAssociation, Currency } from 'shared/generated';

export interface IPlanActivity {
  uuid: string;
  type: PlanActivityType;
  seen: boolean;
  isNew: boolean;
  plan: {
    uuid: string;
    name: string;
    price: number;
    currency: Currency;
    owner?: {
      uuid: string;
      firstName: string;
      lastName: string;
    };
    workoutRoutine?: {
      uuid: string;
    } | null;
    planAssociations?: {
      association: DocumentAssociation;
      user: {
        firstName: string;
        lastName: string;
      };
    }[];
  };
  createdAt: string;
}
