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
  TRAINING,
  SETTINGS,
  EXERCISES,
  CLIENTS,
  TRANSACTIONS,
  SUPPLIES
} from 'shared/routes';
import { PERMISSIONS } from 'shared/constants';
import { UserType } from 'shared/generated';

interface IOption {
  route: string;
  title: string;
  Icon?: any;
  children?: IOption[];
  roles: UserType[];
}

export const OPTIONS: IOption[] = [
  { route: HOME, title: 'Inicio', Icon: HomeOutlined, roles: PERMISSIONS.HOME },
  { route: PROFILE, title: 'Perfil', Icon: UserOutlined, roles: PERMISSIONS.PROFILE },
  { route: PLANS, title: 'Planes', Icon: BookOutlined, roles: PERMISSIONS.PLANS },
  { route: CLIENTS, title: 'Clientes', Icon: TeamOutlined, roles: PERMISSIONS.CLIENTS },
  { route: TRANSACTIONS, title: 'Transaciones', Icon: DollarCircleOutlined, roles: PERMISSIONS.TRANSACTIONS },
  { route: PLAN_INVITATIONS, title: 'Invitaciones', Icon: MailOutlined, roles: PERMISSIONS.PLAN_INVITATIONS },
  { route: WORKOUT_ROUTINES, title: 'Rutinas', Icon: FileOutlined, roles: PERMISSIONS.WORKOUT_ROUTINES },
  { route: BODY_MEASURES, title: 'Mediciones', Icon: HeartOutlined, roles: PERMISSIONS.BODY_MEASURES },
  { route: EXERCISES, title: 'Ejercicios', Icon: RiseOutlined, roles: PERMISSIONS.EXERCISES },
  { route: TRAINING, title: 'Entrenamiento', Icon: ThunderboltOutlined, roles: PERMISSIONS.TRAINING },
  { route: SUPPLIES, title: 'Suplementos', Icon: ShoppingCartOutlined, roles: PERMISSIONS.SUPPLIES },
  { route: SETTINGS, title: 'Configuración', Icon: SettingOutlined, roles: PERMISSIONS.SETTINGS }
];
