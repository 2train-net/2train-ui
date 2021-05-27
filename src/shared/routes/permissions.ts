import * as Routes from './routes';

import { UserType } from 'shared/generated';

const { PersonalTrainer, Customer } = UserType;

const NONE: UserType[] = [];
const PUBLIC: UserType[] = [PersonalTrainer, Customer];
const ONLY_PERSONAL_TRAINERS: UserType[] = [PersonalTrainer];
const ONLY_CUSTOMERS: UserType[] = [Customer];

export const PERMISSIONS = {
  [Routes.HOME]: NONE,
  [Routes.PROFILE]: PUBLIC,
  [Routes.PLANS]: PUBLIC,
  [Routes.PLAN_ADD]: PUBLIC,
  [Routes.PLAN_EDIT]: PUBLIC,
  [Routes.PLAN_DETAIL]: PUBLIC,
  [Routes.PLAN_INVITE]: ONLY_PERSONAL_TRAINERS,
  [Routes.CLIENTS]: ONLY_PERSONAL_TRAINERS,
  [Routes.CLIENT_DETAIL]: ONLY_PERSONAL_TRAINERS,
  [Routes.TRANSACTIONS]: NONE,
  [Routes.PLAN_INVITATIONS]: PUBLIC,
  [Routes.PLAN_INVITATION_ACCEPT]: ONLY_CUSTOMERS,
  [Routes.WORKOUTS]: PUBLIC,
  [Routes.WORKOUT_ROUTINES]: ONLY_PERSONAL_TRAINERS,
  [Routes.WORKOUT_ROUTINE_EDIT]: PUBLIC,
  [Routes.BODY_MEASURES]: NONE,
  [Routes.EXERCISES]: PUBLIC,
  [Routes.EXERCISE_ADD]: PUBLIC,
  [Routes.EXERCISE_EDIT]: PUBLIC,
  [Routes.SUPPLIES]: NONE,
  [Routes.SETTINGS]: PUBLIC
};
