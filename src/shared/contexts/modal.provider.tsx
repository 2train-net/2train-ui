import React, { FC, useState } from 'react';

import { InfoOutlined } from '@ant-design/icons';

import ModalContext, { IModal } from './modal.context';

import ConfirmModal from 'shared/modules/confirm-modal/confirm-modal.component';

const DEFAULT_EMPTY_MODAL: IModal = {
  title: '',
  type: 'info',
  iconRender: InfoOutlined,
  onConfirm: () => {},
  onCancel: () => {}
};

const ModalProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<IModal>(DEFAULT_EMPTY_MODAL);

  const show = (modal: IModal) => {
    setModal(modal);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider value={{ show }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        iconRender={modal.iconRender}
        onConfirm={modal.onConfirm}
        onCancel={() => {
          modal.onCancel && modal.onCancel();
          setIsOpen(false);
          setModal(DEFAULT_EMPTY_MODAL);
        }}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
