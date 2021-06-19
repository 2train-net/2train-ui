import { Modal } from 'shared/contexts/modal.context';

export const DELETE_MODAL: Modal = {
  type: 'danger',
  title: 'Eliminar',
  message: '¿Seguro de que deseas remover este elemento?',
  icon: 'delete',
  closeOnConfirm: true,
  onConfirm: () => {}
};

export const ALERT_UNSAVED_MODAL: Modal = {
  type: 'danger',
  title: 'Advertencia',
  message: '¿Seguro de que deseas continuar se perdera el progreso?',
  icon: 'warning',
  closeOnConfirm: true
};
