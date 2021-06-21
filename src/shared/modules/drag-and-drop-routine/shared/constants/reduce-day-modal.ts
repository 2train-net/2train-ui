import { Modal } from 'shared/contexts/modal.context';

export const REDUCE_DAY_MODAL: Modal = {
  type: 'danger',
  title: 'Advertencia',
  message: '¿ Seguro que desea reducir los dias, se eliminaria su progreso ?',
  icon: 'warning',
  closeOnConfirm: true
};
