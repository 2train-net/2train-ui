import { FC, ReactElement, createContext } from 'react';

import { ConfirmModalType } from 'shared/modules/confirm-modal/confirm-modal.component';

export interface IModal {
  title: string;
  message?: string;
  type: ConfirmModalType;
  iconRender: FC;
  confirmText?: string;
  cancelText?: string;
  contentRender?: ReactElement;
  isLoading?: boolean;
  onConfirm: () => any;
  onCancel?: () => any;
}

export interface IModalContext {
  show: (data: IModal) => any;
}

export default createContext<IModalContext>({
  show: () => {}
});
