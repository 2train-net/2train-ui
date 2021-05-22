import {
  HeartOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  MessageOutlined,
  ReadOutlined,
  ReconciliationOutlined
} from '@ant-design/icons';

import { IIconCard } from 'shared/modules/icon-card/icon-card.component';

import { DateService, PlanService } from 'shared/services';
import { ADD, DIETS, EDIT, WORKOUT_ROUTINES } from 'shared/routes';
import { Currency, PlanStatus, Scope } from 'shared/generated';

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
    plan && plan.startAt && plan.expireAt ? DateService.difference(plan.expireAt, plan.startAt, 'days') : '?';
  const pendingDays = plan?.expireAt && DateService.difference(plan.expireAt, today, 'days');

  const currentDays =
    typeof totalDays === 'number' && pendingDays
      ? pendingDays > totalDays
        ? totalDays
        : totalDays - pendingDays
      : '?';

  const info =
    plan && plan.startAt && plan.expireAt
      ? [
          {
            col: { xs: 24, md: 9 },
            items: [
              { label: 'Desde', value: DateService.format(plan.startAt) },
              { label: 'Hasta', value: DateService.format(plan.expireAt) }
            ]
          },
          {
            col: { xs: 24, md: 6 },
            items: [
              { label: 'Estado', value: PlanService.parseStatus(plan.status) },
              { label: 'Días', value: `${currentDays} / ${totalDays}` }
            ]
          }
        ]
      : [];

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
      iconRender: ReconciliationOutlined,
      isDisabled: !plan?.workoutRoutine
    },
    {
      title: 'Alimentación',
      buttonText: 'Ver',
      url: plan?.dietPlan ? `${DIETS}/${EDIT}/${plan.dietPlan.uuid}` : `${DIETS}/${ADD}`,
      iconRender: ReadOutlined,
      isDisabled: !plan?.dietPlan
    },
    { iconRender: HeartOutlined, title: 'Mediciones', buttonText: 'Ver', isDisabled: true },
    { iconRender: ThunderboltOutlined, title: 'Entrenamiento', buttonText: 'Ver', isDisabled: true },
    { iconRender: LineChartOutlined, title: 'Estadisticas', buttonText: 'Ver', isDisabled: true },
    { iconRender: MessageOutlined, title: 'Chat', buttonText: 'Ver', isDisabled: true }
  ];

  return {
    info,
    owner,
    members,
    iconCards
  };
};
