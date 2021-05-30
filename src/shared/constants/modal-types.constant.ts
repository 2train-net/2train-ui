import { Modal } from 'shared/contexts/modal.context';

export const DELETE_MODAL: Modal = {
  type: 'danger',
  title: 'Eliminar',
  message: '¿Seguro de que deseas remover este elemento?',
  icon: 'delete',
  closeOnConfirm: true,
  onConfirm: () => {}
};
