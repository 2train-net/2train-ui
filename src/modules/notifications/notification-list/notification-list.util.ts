import { IPlanActivity } from 'shared/model';

import { IconType } from 'shared/modules/icon/icon.component';

import {
  NEW_CLIENT_NOTIFICATION_TEXT,
  PLAN_PURCHASE_NOTIFICATION_TEXT,
  PLAN_RENOVATION_NOTIFICATION_TEXT,
  PLAN_INVITATION_CREATE_NOTIFICATION_TEXT,
  PLAN_INVITATION_ACCEPT_NOTIFICATION_TEXT,
  WORKOUT_ROUTINE_CREATE_NOTIFICATION_TEXT,
  WORKOUT_ROUTINE_UPDATE_NOTIFICATION_TEXT,
  DIET_PLAN_FILE_CREATE_NOTIFICATION_TEXT,
  DIET_PLAN_FILE_UPDATE_NOTIFICATION_TEXT,
  BODY_MEASURE_CREATE_NOTIFICATION_TEXT
} from 'modules/notifications/shared/constants';

import {
  NOT_FOUND,
  UUID_PARAM,
  CLIENT_DETAIL,
  PLAN_DETAIL,
  PLAN_INVITATIONS,
  WORKOUT_ROUTINE_DETAIL,
  BODY_MEASURES_BY_PLAN
} from 'shared/routes';
import { PlanActivityType, UserType, DocumentAssociation } from 'shared/generated';
import { INotificationItem } from 'modules/notifications/shared/components/notification-item/notification-item.component';

interface INotificationMessage {
  url: string;
  color: string;
  icon: IconType;
  userType: UserType;
  description: string;
  isPlanNameVisible: boolean;
  isPlanPriceVisible?: boolean;
}

interface INotificationPropTypes {
  [key: string]: INotificationMessage;
}

export const NOTIFICATION_TYPES: INotificationPropTypes = {
  [PlanActivityType.NewClient]: {
    icon: 'crown',
    color: '#FF5733',
    description: NEW_CLIENT_NOTIFICATION_TEXT,
    userType: UserType.Customer,
    isPlanNameVisible: false,
    url: CLIENT_DETAIL
  },
  [PlanActivityType.PlanPurchase]: {
    icon: 'dollar',
    color: '#00C851',
    description: PLAN_PURCHASE_NOTIFICATION_TEXT,
    userType: UserType.Customer,
    isPlanNameVisible: false,
    isPlanPriceVisible: true,
    url: PLAN_DETAIL
  },
  [PlanActivityType.PlanRenovation]: {
    icon: 'trophy',
    color: '#FFC300',
    description: PLAN_RENOVATION_NOTIFICATION_TEXT,
    userType: UserType.Customer,
    isPlanNameVisible: true,
    url: PLAN_DETAIL
  },
  [PlanActivityType.PlanInvitationCreate]: {
    icon: 'mail',
    color: '#40E0D0',
    description: PLAN_INVITATION_CREATE_NOTIFICATION_TEXT,
    userType: UserType.Customer,
    isPlanNameVisible: true,
    url: PLAN_INVITATIONS
  },
  [PlanActivityType.PlanInvitationAccept]: {
    icon: 'mail',
    color: '#40E0D0',
    description: PLAN_INVITATION_ACCEPT_NOTIFICATION_TEXT,
    userType: UserType.Customer,
    isPlanNameVisible: true,
    url: PLAN_DETAIL
  },
  [PlanActivityType.WorkoutRoutineCreate]: {
    icon: 'fileText',
    color: '#34495E',
    description: WORKOUT_ROUTINE_CREATE_NOTIFICATION_TEXT,
    userType: UserType.PersonalTrainer,
    isPlanNameVisible: false,
    url: WORKOUT_ROUTINE_DETAIL
  },
  [PlanActivityType.WorkoutRoutineUpdate]: {
    icon: 'fileText',
    color: '#34495E',
    description: WORKOUT_ROUTINE_UPDATE_NOTIFICATION_TEXT,
    userType: UserType.PersonalTrainer,
    isPlanNameVisible: false,
    url: WORKOUT_ROUTINE_DETAIL
  },
  [PlanActivityType.DietPlanFileCreate]: {
    icon: 'paperClip',
    color: '#2980B9',
    description: DIET_PLAN_FILE_CREATE_NOTIFICATION_TEXT,
    userType: UserType.PersonalTrainer,
    isPlanNameVisible: false,
    url: PLAN_DETAIL
  },
  [PlanActivityType.DietPlanFileUpdate]: {
    icon: 'paperClip',
    color: '#2980B9',
    description: DIET_PLAN_FILE_UPDATE_NOTIFICATION_TEXT,
    userType: UserType.PersonalTrainer,
    isPlanNameVisible: false,
    url: PLAN_DETAIL
  },
  [PlanActivityType.BodyMeasureCreate]: {
    icon: 'heart',
    color: '#B92938',
    description: BODY_MEASURE_CREATE_NOTIFICATION_TEXT,
    userType: UserType.Customer,
    isPlanNameVisible: false,
    url: BODY_MEASURES_BY_PLAN
  }
};

export const getNotificationProps = (type: PlanActivityType, activity: IPlanActivity): INotificationItem => {
  const { userType, isPlanNameVisible, isPlanPriceVisible, url, ...notification } = NOTIFICATION_TYPES[type];

  const user =
    userType === UserType.Customer
      ? activity.plan?.owner
      : activity.plan?.planAssociations?.find(({ association }) => association === DocumentAssociation.Manager)?.user;

  const uuid =
    url === PLAN_DETAIL || url === BODY_MEASURES_BY_PLAN
      ? activity.plan.uuid
      : url === WORKOUT_ROUTINE_DETAIL
      ? activity.plan.workoutRoutine?.uuid
      : url === CLIENT_DETAIL
      ? activity.plan?.owner?.uuid
      : null;

  const additionalText = isPlanNameVisible
    ? activity.plan?.name
    : isPlanPriceVisible
    ? `${activity.plan?.currency} ${activity.plan?.price}`
    : '';

  return {
    ...notification,
    key: activity.uuid,
    isDotVisible: !activity.seen,
    url: url.includes(UUID_PARAM) ? (uuid ? url.replace(UUID_PARAM, uuid) : NOT_FOUND) : url,
    label: `${user?.firstName} ${user?.lastName} `,
    description: `${notification.description} ${additionalText}`
  };
};
