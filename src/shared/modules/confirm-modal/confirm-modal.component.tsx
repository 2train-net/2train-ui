import React, { FC } from 'react';

import { Modal } from 'antd';

import ConfirmationCard from 'shared/modules/confirmation-card/confirmation-card.component';

export type ConfirmModalType = 'success' | 'danger' | 'warning' | 'info';

interface IConfirmModal {
  title: string;
  type: ConfirmModalType;
  message?: string;
  isOpen: boolean;
  iconRender: FC;
  onConfirm: () => any;
  onCancel: () => any;
}

const ConfirmModal: FC<IConfirmModal> = ({ type, title, message, isOpen, iconRender, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={isOpen}
      onOk={onConfirm}
      onCancel={onCancel}
      modalRender={() => (
        <ConfirmationCard
          color={type}
          title={title}
          message={message}
          onCancel={onCancel}
          onConfirm={onConfirm}
          iconRender={iconRender}
        />
      )}
    />
  );
};

export default ConfirmModal;
