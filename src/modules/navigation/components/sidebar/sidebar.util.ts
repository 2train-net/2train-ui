import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  MailOutlined,
  HeartOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  BookOutlined
} from '@ant-design/icons';

import {
  HOME,
  PROFILE,
  PLANS,
  INVITATIONS,
  WORKOUT_ROUTINES,
  BODY_MEASURES,
  TRAINING,
  SETTINGS,
  EXERCISES
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
  { route: PLANS, title: 'Plans', Icon: BookOutlined },
  { route: INVITATIONS, title: 'Invitations', Icon: MailOutlined },
  { route: WORKOUT_ROUTINES, title: 'Routines', Icon: FileOutlined },
  { route: BODY_MEASURES, title: 'Body Measures', Icon: HeartOutlined },
  { route: EXERCISES, title: 'Exercises', Icon: HeartOutlined },
  { route: TRAINING, title: 'Training', Icon: ThunderboltOutlined },
  { route: SETTINGS, title: 'Settings', Icon: SettingOutlined }
];
