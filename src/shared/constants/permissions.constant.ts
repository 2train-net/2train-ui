import { UserType } from 'shared/generated';

const { PersonalTrainer, Customer } = UserType;

const NONE: UserType[] = [];
const PUBLIC: UserType[] = [PersonalTrainer, Customer];
const ONLY_PERSONAL_TRAINERS: UserType[] = [PersonalTrainer];
const ONLY_CUSTOMERS: UserType[] = [Customer];

export const PERMISSIONS = {
  HOME: NONE,
  PROFILE: PUBLIC,
  PLANS: PUBLIC,
  CLIENTS: ONLY_PERSONAL_TRAINERS,
  TRANSACTIONS: NONE,
  PLAN_INVITATIONS: PUBLIC,
  WORKOUTS: PUBLIC,
  WORKOUT_ROUTINES: ONLY_PERSONAL_TRAINERS, // TODO ALLOW WHEN CUSTOMER WANT TO SEE THE ROUTINE
  BODY_MEASURES: NONE,
  EXERCISES: PUBLIC,
  SUPPLIES: NONE,
  SETTINGS: PUBLIC
};
