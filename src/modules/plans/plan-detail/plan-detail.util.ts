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
import { ADD, DETAIL, DIETS, WORKOUT_ROUTINES } from 'shared/routes';
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
  const owner = plan?.owner;
  const members = owner ? [owner] : [];

  const totalDays = plan && plan.finishedAt ? DateService.difference(plan.finishedAt, plan.createdAt, 'days') : '?';

  const currentDays =
    plan && typeof totalDays === 'number' && plan.finishedAt
      ? totalDays - DateService.difference(plan.finishedAt, new Date(), 'days')
      : '?';

  const info =
    plan && plan.finishedAt
      ? [
          {
            col: { xs: 24, md: 9 },
            items: [
              { label: 'Desde', value: DateService.format(plan.createdAt) },
              { label: 'Hasta', value: DateService.format(plan.finishedAt) }
            ]
          },
          {
            col: { xs: 24, md: 6 },
            items: [
              { label: 'Estado', value: PlanService.parseStatus(plan.status) },
              { label: 'Días', value: `${currentDays > totalDays ? totalDays : currentDays} / ${totalDays}` }
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
      buttonText: plan?.workoutRoutine ? 'Ver' : 'Crear',
      url: plan?.workoutRoutine
        ? `${WORKOUT_ROUTINES}/${DETAIL}/${plan.workoutRoutine.uuid}`
        : `${WORKOUT_ROUTINES}/${ADD}`,
      iconRender: ReconciliationOutlined
    },
    {
      title: 'Alimentación',
      buttonText: plan?.dietPlan ? 'Ver' : 'Crear',
      url: plan?.dietPlan ? `${DIETS}/${DETAIL}/${plan.dietPlan.uuid}` : `${DIETS}/${ADD}`,
      iconRender: ReadOutlined
    },
    { iconRender: HeartOutlined, title: 'Mediciones', buttonText: 'Ver' },
    { iconRender: ThunderboltOutlined, title: 'Entrenamiento', buttonText: 'Ver' },
    { iconRender: LineChartOutlined, title: 'Estadisticas', buttonText: 'Ver' },
    { iconRender: MessageOutlined, title: 'Chat', buttonText: 'Ver' }
  ];

  return {
    info,
    owner,
    members,
    iconCards
  };
};
