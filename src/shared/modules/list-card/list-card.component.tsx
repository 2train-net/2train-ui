import React, { FC, ReactNode } from 'react';

import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Card } from 'antd';

import { Icon } from 'shared/modules';
import { EDIT, DETAIL, DELETE } from 'shared/routes';

export interface IListCard {
  uuid: string;
  title: string | ReactNode;
  image?: string | null;
  description?: string | ReactNode;
  emptyActions?: boolean;
  actions?: ReactNode[];
  leftContent?: ReactNode;
  isDetailActionEnabled?: boolean;
  isEditActionEnabled?: boolean;
  isDeleteActionEnabled?: boolean;
  onEdit?: () => any;
  onDetail?: () => any;
  onDelete?: () => any;
}

const { Meta } = Card;

const ListCard: FC<IListCard> = ({
  uuid,
  title,
  image,
  description,
  emptyActions = false,
  isDetailActionEnabled = true,
  isEditActionEnabled = true,
  isDeleteActionEnabled = true,
  actions = [],
  leftContent,
  onEdit,
  onDetail,
  onDelete,
}) => {
  const location = useLocation();
  const history = useHistory();

  const redirect = history.push;
  const { pathname } = location;

  const cardActions: ReactNode[] = actions;

  if (!emptyActions) {
    if (isDeleteActionEnabled) {
      cardActions.push(
        <Icon type="delete" onClick={onDelete ? onDelete : () => redirect(`${pathname}/${DELETE}/${uuid}`)} />
      );
    }

    if (isEditActionEnabled) {
      cardActions.push(<Icon type="edit" onClick={onEdit ? onEdit : () => redirect(`${pathname}/${EDIT}/${uuid}`)} />);
    }

    if (isDetailActionEnabled) {
      cardActions.push(
        <Icon type="view" onClick={onDetail ? onDetail : () => redirect(`${pathname}/${DETAIL}/${uuid}`)} />
      );
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      {image && <img style={{ width: 114, height: 114, marginRight: -1, zIndex: 0 }} src={image || ''} />}
      <Card style={{ width: image ? 186 : 300 }} actions={cardActions} bordered={!image}>
        <div style={{ display: 'flex' }}>
          {leftContent && <div style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 16 }}>{leftContent}</div>}
          <Meta title={title} description={description} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} />
        </div>
      </Card>
    </div>
  );
};

export default ListCard;
