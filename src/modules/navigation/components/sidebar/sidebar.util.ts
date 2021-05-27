import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  MailOutlined,
  HeartOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  BookOutlined,
  RiseOutlined,
  TeamOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

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

interface IOption {
  route: string;
  title: string;
  Icon?: any;
  children?: IOption[];
}

export const OPTIONS: IOption[] = [
  { route: HOME, title: 'Inicio', Icon: HomeOutlined },
  { route: PROFILE, title: 'Perfil', Icon: UserOutlined },
  { route: PLANS, title: 'Planes', Icon: BookOutlined },
  { route: CLIENTS, title: 'Clientes', Icon: TeamOutlined },
  { route: TRANSACTIONS, title: 'Transaciones', Icon: DollarCircleOutlined },
  { route: PLAN_INVITATIONS, title: 'Invitaciones', Icon: MailOutlined },
  { route: WORKOUT_ROUTINES, title: 'Rutinas', Icon: FileOutlined },
  { route: BODY_MEASURES, title: 'Mediciones', Icon: HeartOutlined },
  { route: EXERCISES, title: 'Ejercicios', Icon: RiseOutlined },
  { route: WORKOUTS, title: 'Entrenamientos', Icon: ThunderboltOutlined },
  { route: SUPPLIES, title: 'Suplementos', Icon: ShoppingCartOutlined },
  { route: SETTINGS, title: 'Configuración', Icon: SettingOutlined }
];
