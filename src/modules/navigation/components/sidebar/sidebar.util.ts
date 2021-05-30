import {
  HOME,
  PROFILE,
  PLANS,
  PLAN_INVITATIONS,
  WORKOUT_ROUTINES,
  BODY_MEASURES,
  WORKOUTS,
  SETTINGS,
  EXERCISES,
  CLIENTS,
  TRANSACTIONS,
  SUPPLIES
} from 'shared/routes';
import { IconType } from 'shared/modules/icon/icon.component';

interface IOption {
  route: string;
  title: string;
  icon?: IconType;
  children?: IOption[];
}

export const OPTIONS: IOption[] = [
  { route: HOME, title: 'Inicio', icon: 'home' },
  { route: PROFILE, title: 'Perfil', icon: 'user' },
  { route: PLANS, title: 'Planes', icon: 'book' },
  { route: CLIENTS, title: 'Clientes', icon: 'team' },
  { route: TRANSACTIONS, title: 'Transaciones', icon: 'dollar' },
  { route: PLAN_INVITATIONS, title: 'Invitaciones', icon: 'mail' },
  { route: WORKOUT_ROUTINES, title: 'Rutinas', icon: 'file' },
  { route: BODY_MEASURES, title: 'Mediciones', icon: 'heart' },
  { route: EXERCISES, title: 'Ejercicios', icon: 'rise' },
  { route: WORKOUTS, title: 'Entrenamientos', icon: 'thunderbolt' },
  { route: SUPPLIES, title: 'Suplementos', icon: 'shoppingCart' },
  { route: SETTINGS, title: 'Configuración', icon: 'setting' }
];
