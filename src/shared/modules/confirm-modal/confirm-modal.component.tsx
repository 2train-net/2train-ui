import React, { FC, ReactElement } from 'react';

import { Modal } from 'antd';

import ConfirmationCard from 'shared/modules/confirmation-card/confirmation-card.component';

export type ConfirmModalType = 'success' | 'danger' | 'warning' | 'info';

interface IConfirmModal {
  title: string;
  type: ConfirmModalType;
  message?: string;
  isOpen: boolean;
  iconRender: FC;
  contentRender?: ReactElement;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
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
          />
        );
      }}
    />
  );
};

export default ConfirmModal;
