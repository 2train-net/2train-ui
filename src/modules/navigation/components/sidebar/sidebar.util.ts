import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  MailOutlined,
  HeartOutlined,
  ThunderboltOutlined,
  SettingOutlined
} from '@ant-design/icons';

import {
  HOME,
  PROFILE,
  TEAM,
  TEAM_CUSTOMERS,
  TEAM_TRAINERS,
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_CUSTOMERS,
  SUBSCRIPTIONS_TRAINERS,
  WORKOUT_ROUTINES,
  BODY_MEASURES,
  TRAINING,
  SETTINGS
} from 'shared/routes';

interface IOption {
  route: string;
  title: string;
  Icon?: any;
  children?: IOption[];
}

export const OPTIONS: IOption[] = [
  { route: HOME, title: 'Home', Icon: HomeOutlined },
  { route: PROFILE, title: 'Profile', Icon: UserOutlined },
  {
    route: TEAM,
    title: 'Team',
    Icon: TeamOutlined,
    children: [
      { route: TEAM_TRAINERS, title: 'Trainers' },
      { route: TEAM_CUSTOMERS, title: 'Customers' }
    ]
  },
  {
    route: SUBSCRIPTIONS,
    title: 'Subscriptions',
    Icon: MailOutlined,
    children: [
      { route: SUBSCRIPTIONS_TRAINERS, title: 'Trainers' },
      { route: SUBSCRIPTIONS_CUSTOMERS, title: 'Customers' }
    ]
  },
  { route: WORKOUT_ROUTINES, title: 'Routines', Icon: FileOutlined },
  { route: BODY_MEASURES, title: 'Body Measures', Icon: HeartOutlined },
  { route: TRAINING, title: 'Training', Icon: ThunderboltOutlined },
  { route: SETTINGS, title: 'Settings', Icon: SettingOutlined }
];
