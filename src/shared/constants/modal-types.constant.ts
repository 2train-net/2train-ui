import { DeleteFilled } from '@ant-design/icons';

import { IModal } from 'shared/contexts/modal.context';

export const DELETE_MODAL: IModal = {
  type: 'danger',
  title: 'Eliminar',
  message: '¿Seguro de que deseas remover este elemento?',
  iconRender: DeleteFilled,
  onConfirm: () => {}
};
