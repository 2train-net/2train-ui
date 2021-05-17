import { AppstoreAddOutlined } from '@ant-design/icons';

import { Modal } from 'shared/contexts/modal.context';

export const WORKOUT_EXERCISE_MODAL: Modal = {
  type: 'danger',
  title: 'Agregar ejercicio',
  confirmText: 'Guardar',
  iconRender: AppstoreAddOutlined
};
