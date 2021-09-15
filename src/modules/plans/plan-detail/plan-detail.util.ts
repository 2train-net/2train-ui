import { IIconCard } from 'shared/modules/icon-card/icon-card.component';

import { DateService, PlanService } from 'shared/services';
import { ADD, DETAIL, DIET_PLANS, EDIT, TRAINING, WORKOUT_ROUTINES } from 'shared/routes';
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
    file?: string | null;
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
  url?: string | null;
  isNewTabRedirection: boolean;
}

export const format = (userType?: UserType, plan?: IPlanDetail) => {
  const today = new Date();
  const owner = plan?.owner;
  const members = owner ? [owner] : [];
  const isClient = userType === UserType.Customer;
  const isPersonalTrainer = userType === UserType.PersonalTrainer;
  const isDietFileEnabled = isClient && !!plan?.dietPlan?.file;
  const isAvailable = plan?.startAt && plan?.expireAt && DateService.isBetween(today, plan.startAt, plan.expireAt);

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
      isDisabled: !plan?.workoutRoutine,
      isNewTabRedirection: false
    },
    {
      title: DIET_TEXT,
      buttonText: LOOK_TEXT,
      url: plan && isDietFileEnabled ? plan.dietPlan?.file : `${DIET_PLANS}/${EDIT}/${plan?.dietPlan?.uuid}`,
      icon: 'read',
      isDisabled: isPersonalTrainer ? !plan?.dietPlan : !isDietFileEnabled,
      isNewTabRedirection: isClient
    },
    { icon: 'heart', title: BODY_MEASURES_TEXT, buttonText: LOOK_TEXT, isDisabled: true, isNewTabRedirection: false },
    { icon: 'lineChart', title: STATISTICS_TEXT, buttonText: LOOK_TEXT, isDisabled: true, isNewTabRedirection: false },
    { icon: 'chat', title: CHAT_TEXT, buttonText: LOOK_TEXT, isDisabled: true, isNewTabRedirection: false }
  ];

  isClient &&
    iconCards.unshift({
      icon: 'thunderbolt',
      title: TRAINING_TEXT,
      buttonText: LOOK_TEXT,
      url: TRAINING,
      isDisabled: !plan?.workoutRoutine || !isAvailable,
      isNewTabRedirection: false
    });

  return {
    info,
    owner,
    members,
    iconCards,
    isClient
  };
};
