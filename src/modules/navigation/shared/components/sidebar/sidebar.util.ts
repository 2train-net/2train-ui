import {
  PROFILE,
  PLANS,
  PLAN_INVITATIONS,
  WORKOUT_ROUTINES,
  WORKOUTS,
  SETTINGS,
  EXERCISES,
  CLIENTS,
  TRANSACTIONS,
  SUPPLIES,
} from 'shared/routes';

import {
  PROFILE_TEXT,
  PLANS_TEXT,
  CLIENTS_TEXT,
  TRANSACTIONS_TEXT,
  WORKOUT_ROUTINES_TEXT,
  EXERCISES_TEXT,
  PLAN_INVITATIONS_TEXT,
  WORKOUTS_TEXT,
  SUPPLIES_TEXT,
  SETTINGS_TEXT,
} from 'shared/constants';

import { IconType } from 'shared/modules/icon/icon.component';

interface IOption {
  route: string;
  title: string;
  icon?: IconType;
  children?: IOption[];
}

export const OPTIONS: IOption[] = [
  { route: PROFILE, title: PROFILE_TEXT, icon: 'user' },
  { route: PLANS, title: PLANS_TEXT, icon: 'book' },
  { route: CLIENTS, title: CLIENTS_TEXT, icon: 'team' },
  { route: TRANSACTIONS, title: TRANSACTIONS_TEXT, icon: 'dollar' },
  { route: WORKOUT_ROUTINES, title: WORKOUT_ROUTINES_TEXT, icon: 'file' },
  { route: EXERCISES, title: EXERCISES_TEXT, icon: 'rise' },
  { route: PLAN_INVITATIONS, title: PLAN_INVITATIONS_TEXT, icon: 'mail' },
  { route: WORKOUTS, title: WORKOUTS_TEXT, icon: 'thunderbolt' },
  { route: SUPPLIES, title: SUPPLIES_TEXT, icon: 'shoppingCart' },
  { route: SETTINGS, title: SETTINGS_TEXT, icon: 'setting' },
];
