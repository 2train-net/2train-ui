import { Modal, RefreshModal } from 'shared/contexts/modal.context';

export const PLAN_INVITATION_MODAL: Modal = {
  type: 'info',
  title: 'Invitar',
  confirmText: 'Enviar',
  icon: 'share'
};

export const PLAN_INVITATION_LINK_MODAL: RefreshModal = {
  title: 'Link',
  confirmText: 'Copiar',
  isCancelButtonAvailable: false,
  closeOnConfirm: true,
  contentRender: undefined
};
