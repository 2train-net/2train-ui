import { createContext } from 'react';

import { IModal, IRefreshModal } from 'shared/model';

export interface Modal extends IModal {
  closeOnConfirm?: boolean;
}

export interface RefreshModal extends IRefreshModal {
  closeOnConfirm?: boolean;
}

export interface IModalContext {
  show: (data: Modal) => any;
  refresh: (data: RefreshModal) => any;
  close: () => any;
}

export default createContext<IModalContext>({
  show: () => {},
  refresh: () => {},
  close: () => {}
});
