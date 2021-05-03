import React, { FC, useState } from 'react';

import { InfoOutlined } from '@ant-design/icons';

import ModalContext, { Modal, RefreshModal } from './modal.context';

import ConfirmModal from 'shared/modules/confirm-modal/confirm-modal.component';

const DEFAULT_EMPTY_MODAL: Modal = {
  title: '',
  type: 'info',
  iconRender: InfoOutlined,
  onConfirm: () => {},
  onCancel: () => {}
};

const ModalProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<Modal>(DEFAULT_EMPTY_MODAL);

  const show = (modal: Modal) => {
    setModal(modal);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setModal(DEFAULT_EMPTY_MODAL);
  };

  const refresh = (newModal: RefreshModal) => {
    setModal(modal => ({ ...modal, ...newModal }));
  };

  return (
    <ModalContext.Provider value={{ show, refresh, close }}>
      {children}
      <ConfirmModal
        {...modal}
        isOpen={isOpen}
        onConfirm={() => {
          modal.onConfirm && modal.onConfirm();
          if (modal.closeOnConfirm) {
            setIsOpen(false);
            setModal(DEFAULT_EMPTY_MODAL);
          }
        }}
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
