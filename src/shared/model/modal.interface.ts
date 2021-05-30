import { FC, ReactElement } from 'react';

import { IconType } from 'shared/modules/icon/icon.component';

export type ConfirmModalType = 'success' | 'danger' | 'warning' | 'info';

export interface IModal {
  title: string;
  type: ConfirmModalType;
  message?: string;
  icon: IconType;
  contentRender?: ReactElement;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isCancelButtonAvailable?: boolean;
  onConfirm?: () => any;
  onCancel?: () => any;
}

export interface IRefreshModal {
  title?: string;
  type?: ConfirmModalType;
  message?: string;
  iconRender?: FC;
  contentRender?: ReactElement;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isCancelButtonAvailable?: boolean;
  onConfirm?: () => any;
  onCancel?: () => any;
}
