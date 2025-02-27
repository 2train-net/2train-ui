import * as Routes from './routes';

import { UserType } from 'shared/generated';

const { PersonalTrainer, Customer } = UserType;

const NONE: UserType[] = [];
const PUBLIC: UserType[] = [PersonalTrainer, Customer];
const ONLY_PERSONAL_TRAINERS: UserType[] = [PersonalTrainer];
const ONLY_CUSTOMERS: UserType[] = [Customer];

export const PERMISSIONS = {
  [Routes.HOME]: PUBLIC,
  [Routes.PROFILE]: PUBLIC,
  [Routes.PLANS]: PUBLIC,
  [Routes.PLAN_ADD]: ONLY_PERSONAL_TRAINERS,
  [Routes.PLAN_EDIT]: ONLY_PERSONAL_TRAINERS,
  [Routes.PLAN_DETAIL]: PUBLIC,
  [Routes.PLAN_DELETE]: ONLY_PERSONAL_TRAINERS,
  [Routes.PLAN_INVITE]: ONLY_PERSONAL_TRAINERS,
  [Routes.CLIENTS]: ONLY_PERSONAL_TRAINERS,
  [Routes.CLIENT_DETAIL]: ONLY_PERSONAL_TRAINERS,
  [Routes.TRANSACTIONS]: NONE,
  [Routes.PLAN_INVITATIONS]: PUBLIC,
  [Routes.PLAN_INVITATION_ACCEPT]: ONLY_CUSTOMERS,
  [Routes.WORKOUT_ROUTINES]: NONE,
  [Routes.WORKOUT_ROUTINE_EDIT]: ONLY_PERSONAL_TRAINERS,
  [Routes.WORKOUT_ROUTINE_DETAIL]: ONLY_CUSTOMERS,
  [Routes.WORKOUTS]: PUBLIC,
  [Routes.WORKOUT_ADD]: ONLY_CUSTOMERS,
  [Routes.BODY_MEASURES]: NONE,
  [Routes.EXERCISES]: ONLY_PERSONAL_TRAINERS,
  [Routes.EXERCISE_ADD]: ONLY_PERSONAL_TRAINERS,
  [Routes.EXERCISE_EDIT]: ONLY_PERSONAL_TRAINERS,
  [Routes.EXERCISE_DELETE]: ONLY_PERSONAL_TRAINERS,
  [Routes.EXERCISE_DETAIL]: PUBLIC,
  [Routes.MEALS]: ONLY_PERSONAL_TRAINERS,
  [Routes.MEAL_ADD]: ONLY_PERSONAL_TRAINERS,
  [Routes.MEAL_EDIT]: ONLY_PERSONAL_TRAINERS,
  [Routes.MEAL_DELETE]: ONLY_PERSONAL_TRAINERS,
  [Routes.SUPPLIES]: NONE,
  [Routes.SETTINGS]: NONE,
  [Routes.TRAINING]: ONLY_CUSTOMERS,
  [Routes.TRAINING_WORKOUT]: ONLY_CUSTOMERS,
  [Routes.TRAINING_DETAIL]: ONLY_CUSTOMERS
};
