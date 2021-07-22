import { Modal } from 'shared/contexts/modal.context';

export const IMPORT_TEMPLATE_MODAL: Modal = {
  type: 'secondary',
  title: 'Advertencia',
  message: '¿Seguro que desea importar esta rutina, podría perder su progreso?',
  icon: 'question',
  closeOnConfirm: true
};
