import {
  HomeOutlined,
  TeamOutlined,
  FileOutlined,
  MailOutlined,
  HeartOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

interface IOption {
  route: string;
  title: string;
  Icon?: any;
  children?: IOption[];
}

export const OPTIONS: IOption[] = [
  { route: 'home', title: 'Home', Icon: HomeOutlined },
  {
    route: 'team',
    title: 'Team',
    Icon: TeamOutlined,
    children: [
      { route: 'trainers', title: 'Trainers' },
      { route: 'customers', title: 'Customers' }
    ]
  },
  {
    route: 'subscriptions',
    title: 'Subscriptions',
    Icon: MailOutlined,
    children: [
      { route: 'trainers', title: 'Trainers' },
      { route: 'customers', title: 'Customers' }
    ]
  },
  { route: 'workout-routines', title: 'Routines', Icon: FileOutlined },
  { route: 'body-measures', title: 'Body Measures', Icon: HeartOutlined },
  { route: 'training', title: 'Training', Icon: ThunderboltOutlined }
];
