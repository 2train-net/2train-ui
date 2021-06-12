import { IIconCard } from 'shared/modules/icon-card/icon-card.component';

import { DateService, PlanService } from 'shared/services';
import { ADD, DIETS, EDIT, WORKOUT_ROUTINES } from 'shared/routes';
import { Currency, PlanStatus, Scope } from 'shared/generated';
import { DEFAULT_DATE_FORMAT, ISO } from 'shared/constants';

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

export const format = (plan?: IPlanDetail) => {
  const today = new Date();
  const owner = plan?.owner;
  const members = owner ? [owner] : [];

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
          label: 'Desde',
          value: plan?.startAt ? DateService.format(plan.startAt, DEFAULT_DATE_FORMAT, ISO) : undefined
        },
        {
          label: 'Hasta',
          value: plan?.expireAt ? DateService.format(plan.expireAt, DEFAULT_DATE_FORMAT, ISO) : undefined
        }
      ]
    },
    {
      col: { xs: 24, md: 6 },
      items: [
        { label: 'Estado', value: plan?.status ? PlanService.parseStatus(plan.status) : undefined },
        { label: 'Días', value: currentDays && totalDays ? `${currentDays} / ${totalDays}` : undefined }
      ]
    }
  ];

  if (plan?.planAssociations?.length) {
    members.push(...plan.planAssociations.map(({ user }) => user));
  }

  const iconCards: IPlanIconCard[] = [
    {
      title: 'Ejercicios',
      buttonText: 'Ver',
      url: plan?.workoutRoutine
        ? `${WORKOUT_ROUTINES}/${EDIT}/${plan.workoutRoutine.uuid}`
        : `${WORKOUT_ROUTINES}/${ADD}`,
      icon: 'reconciliation',
      isDisabled: !plan?.workoutRoutine
    },
    {
      title: 'Alimentación',
      buttonText: 'Ver',
      url: plan?.dietPlan ? `${DIETS}/${EDIT}/${plan.dietPlan.uuid}` : `${DIETS}/${ADD}`,
      icon: 'read',
      isDisabled: !plan?.dietPlan
    },
    { icon: 'heart', title: 'Mediciones', buttonText: 'Ver', isDisabled: true },
    { icon: 'thunderbolt', title: 'Entrenamiento', buttonText: 'Ver', isDisabled: true },
    { icon: 'lineChart', title: 'Estadisticas', buttonText: 'Ver', isDisabled: true },
    { icon: 'chat', title: 'Chat', buttonText: 'Ver', isDisabled: true }
  ];

  return {
    info,
    owner,
    members,
    iconCards
  };
};
