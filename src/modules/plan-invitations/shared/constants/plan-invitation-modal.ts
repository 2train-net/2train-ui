import { MailOutlined } from '@ant-design/icons';

import { Modal } from 'shared/contexts/modal.context';

export const PLAN_INVITATION_ACCEPT_MODAL: Modal = {
  type: 'info',
  title: '',
  confirmText: 'Aceptar',
  iconRender: MailOutlined
};
