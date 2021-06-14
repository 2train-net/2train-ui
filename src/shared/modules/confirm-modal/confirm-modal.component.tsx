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
  icon,
  type,
  title,
  message,
  isOpen,
  isLoading,
  confirmText,
  cancelText,
  contentRender,
  isCancelButtonAvailable,
  isSubmitButtonAvailable,
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
            icon={icon}
            contentRender={contentRender}
            isLoading={isLoading}
            isCancelButtonAvailable={isCancelButtonAvailable}
            isSubmitButtonAvailable={isSubmitButtonAvailable}
          />
        );
      }}
    />
  );
};

export default ConfirmModal;
