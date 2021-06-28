import { IIconCard } from 'shared/modules/icon-card/icon-card.component';

import { DateService, PlanService } from 'shared/services';
import { ADD, DETAIL, DIETS, EDIT, WORKOUT_ROUTINES } from 'shared/routes';
import { Currency, PlanStatus, Scope, UserType } from 'shared/generated';
import { DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT } from 'shared/constants';
import {
  FROM_TEXT,
  TO_TEXT,
  DAYS_TEXT,
  STATUS_TEXT,
  LOOK_TEXT,
  EXERCISES_TEXT,
  DIET_TEXT,
  BODY_MEASURES_TEXT,
  TRAINING_TEXT,
  STATISTICS_TEXT,
  CHAT_TEXT
} from 'shared/constants';

interface IPlanDetail {
  uuid: string;
  name: string;
  price: number;
  currency: Currency;
  intervalCount: number;
  intervalPlan: string;
  status: PlanStatus;
  scope: Scope;
  description?: string | null;
  isDietPlanEnabled: boolean;
  isExercisesPlanEnabled: boolean;
  createdAt: Date;
  finishedAt?: Date | null;
  startAt?: Date | null;
  expireAt?: Date | null;
  owner: {
    uuid: string;
    avatar?: string | null;
    firstName: string;
    lastName: string;
  };
  dietPlan?: {
    uuid: string;
  } | null;
  workoutRoutine?: {
    uuid: string;
  } | null;
  planAssociations: {
    association: string;
    user: {
      uuid: string;
      firstName: string;
      lastName: string;
      avatar?: string | null;
    };
  }[];
}

interface IPlanIconCard extends IIconCard {
  url?: string;
}

export const format = (userType?: UserType, plan?: IPlanDetail) => {
  const today = new Date();
  const owner = plan?.owner;
  const members = owner ? [owner] : [];
  const isClient = userType === UserType.Customer;

  const totalDays =
    plan && plan.startAt && plan.expireAt ? DateService.difference(plan.expireAt, plan.startAt, 'days') : undefined;
  const pendingDays = plan?.expireAt && DateService.difference(plan.expireAt, today, 'days');

  const currentDays =
    typeof totalDays === 'number' && pendingDays
      ? pendingDays > totalDays
        ? totalDays
        : totalDays - pendingDays
      : undefined;

  const info = [
    {
      col: { xs: 24, md: 9 },
      items: [
        {
          label: FROM_TEXT,
          value: plan?.startAt
            ? DateService.format(plan.startAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)
            : undefined
        },
        {
          label: TO_TEXT,
          value: plan?.expireAt
            ? DateService.format(plan.expireAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)
            : undefined
        }
      ]
    },
    {
      col: { xs: 24, md: 6 },
      items: [
        { label: STATUS_TEXT, value: plan?.status ? PlanService.parseStatus(plan.status) : undefined },
        { label: DAYS_TEXT, value: currentDays && totalDays ? `${currentDays} / ${totalDays}` : undefined }
      ]
    }
  ];

  if (plan?.planAssociations?.length) {
    members.push(...plan.planAssociations.map(({ user }) => user));
  }

  const iconCards: IPlanIconCard[] = [
    {
      title: EXERCISES_TEXT,
      buttonText: LOOK_TEXT,
      url: plan?.workoutRoutine
        ? `${WORKOUT_ROUTINES}/${isClient ? DETAIL : EDIT}/${plan.workoutRoutine.uuid}`
        : `${WORKOUT_ROUTINES}/${ADD}`,
      icon: 'reconciliation',
      isDisabled: !plan?.workoutRoutine
    },
    {
      title: DIET_TEXT,
      buttonText: LOOK_TEXT,
      url: plan?.dietPlan ? `${DIETS}/${EDIT}/${plan.dietPlan.uuid}` : `${DIETS}/${ADD}`,
      icon: 'read',
      // isDisabled: !plan?.dietPlan
      isDisabled: true
    },
    { icon: 'heart', title: BODY_MEASURES_TEXT, buttonText: LOOK_TEXT, isDisabled: true },
    { icon: 'thunderbolt', title: TRAINING_TEXT, buttonText: LOOK_TEXT, isDisabled: true },
    { icon: 'lineChart', title: STATISTICS_TEXT, buttonText: LOOK_TEXT, isDisabled: true },
    { icon: 'chat', title: CHAT_TEXT, buttonText: LOOK_TEXT, isDisabled: true }
  ];

  return {
    info,
    owner,
    members,
    iconCards
  };
};
