import React, { FC } from 'react';

import { Modal } from 'antd';

import ConfirmationCard from 'shared/modules/confirmation-card/confirmation-card.component';
import { IModal } from 'shared/model';

interface IConfirmModal extends IModal {
  isOpen: boolean;
  onConfirm: () => any;
  onCancel: () => any;
}

const doNothing = () => {};

const ConfirmModal: FC<IConfirmModal> = ({
  type,
  title,
  message,
  isOpen,
  isLoading,
  iconRender,
  confirmText,
  cancelText,
  contentRender,
  isCancelButtonAvailable,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal
      visible={isOpen}
      onCancel={!isLoading ? onCancel : doNothing}
      modalRender={() => {
        return (
          <ConfirmationCard
            color={type}
            title={title}
            message={message}
            confirmText={confirmText}
            cancelText={cancelText}
            onCancel={!isLoading ? onCancel : doNothing}
            onConfirm={!isLoading ? onConfirm : doNothing}
            iconRender={iconRender}
            contentRender={contentRender}
            isLoading={isLoading}
            isCancelButtonAvailable={isCancelButtonAvailable}
          />
        );
      }}
    />
  );
};

export default ConfirmModal;
