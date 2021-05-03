import { DeleteFilled } from '@ant-design/icons';

import { Modal } from 'shared/contexts/modal.context';

export const DELETE_MODAL: Modal = {
  type: 'danger',
  title: 'Eliminar',
  message: '¿Seguro de que deseas remover este elemento?',
  iconRender: DeleteFilled,
  onConfirm: () => {}
};
