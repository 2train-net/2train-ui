import React, { FC } from 'react';

import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  MailOutlined,
  HeartOutlined,
  PlusOutlined,
  InfoOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  LoadingOutlined,
  ReloadOutlined,
  BookOutlined,
  RiseOutlined,
  TeamOutlined,
  LockOutlined,
  PhoneOutlined,
  MenuOutlined,
  ShareAltOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  SafetyCertificateOutlined,
  GoogleOutlined,
  FacebookOutlined,
  InfoCircleOutlined,
  AppstoreAddOutlined,
  LineChartOutlined,
  MessageOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  MinusOutlined,
  CheckOutlined,
  UpOutlined,
  DownOutlined,
  WarningOutlined
} from '@ant-design/icons';

export type IconType =
  | 'home'
  | 'user'
  | 'mail'
  | 'info'
  | 'view'
  | 'edit'
  | 'delete'
  | 'share'
  | 'reload'
  | 'plus'
  | 'heart'
  | 'team'
  | 'phone'
  | 'file'
  | 'menu'
  | 'loading'
  | 'thunderbolt'
  | 'setting'
  | 'dollar'
  | 'book'
  | 'lock'
  | 'rise'
  | 'crown'
  | 'infoCircle'
  | 'shoppingCart'
  | 'safetyCertificate'
  | 'google'
  | 'facebook'
  | 'appstoreAdd'
  | 'lineChart'
  | 'chat'
  | 'read'
  | 'reconciliation'
  | 'minus'
  | 'check'
  | 'up'
  | 'down'
  | 'warning';

interface IIcon {
  key?: string;
  type: IconType;
  className?: string;
  onClick?: () => any;
}

const outlinedIconDictionary = {
  home: HomeOutlined,
  user: UserOutlined,
  mail: MailOutlined,
  heart: HeartOutlined,
  team: TeamOutlined,
  file: FileOutlined,
  view: EyeOutlined,
  edit: EditOutlined,
  delete: DeleteOutlined,
  share: ShareAltOutlined,
  reload: ReloadOutlined,
  thunderbolt: ThunderboltOutlined,
  setting: SettingOutlined,
  dollar: DollarCircleOutlined,
  phone: PhoneOutlined,
  shoppingCart: ShoppingCartOutlined,
  book: BookOutlined,
  plus: PlusOutlined,
  rise: RiseOutlined,
  crown: CrownOutlined,
  menu: MenuOutlined,
  loading: LoadingOutlined,
  info: InfoOutlined,
  infoCircle: InfoCircleOutlined,
  safetyCertificate: SafetyCertificateOutlined,
  lock: LockOutlined,
  google: GoogleOutlined,
  facebook: FacebookOutlined,
  appstoreAdd: AppstoreAddOutlined,
  lineChart: LineChartOutlined,
  chat: MessageOutlined,
  read: ReadOutlined,
  reconciliation: ReconciliationOutlined,
  minus: MinusOutlined,
  check: CheckOutlined,
  up: UpOutlined,
  down: DownOutlined,
  warning: WarningOutlined
};

const Icon: FC<IIcon> = ({ key, type, className, onClick }) => {
  const IconRender = outlinedIconDictionary[type];

  return <IconRender key={key || type} className={className} onClick={onClick} />;
};

export default Icon;
