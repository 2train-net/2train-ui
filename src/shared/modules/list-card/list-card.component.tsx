import React, { FC, ReactNode } from 'react';

import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Card } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import { EDIT, DETAIL, DELETE } from 'shared/routes';

interface IListCard {
  uuid: string;
  title: string | ReactNode;
  description: string | ReactNode;
  emptyActions?: boolean;
  actions?: ReactNode[];
  leftContent?: ReactNode;
  isViewActionEnabled?: boolean;
  isEditActionEnabled?: boolean;
  isDeleteActionEnabled?: boolean;
}

const { Meta } = Card;

const ListCard: FC<IListCard> = ({
  uuid,
  title,
  description,
  emptyActions = false,
  isViewActionEnabled = true,
  isEditActionEnabled = true,
  isDeleteActionEnabled = true,
  actions = [],
  leftContent
}) => {
  const location = useLocation();
  const history = useHistory();

  const redirect = history.push;
  const { pathname } = location;

  const cardActions: ReactNode[] = actions;

  if (!emptyActions) {
    if (isDeleteActionEnabled) {
      cardActions.push(<DeleteOutlined key="delete" onClick={() => redirect(`${pathname}/${DELETE}/${uuid}`)} />);
    }

    if (isEditActionEnabled) {
      cardActions.push(<EditOutlined key="edit" onClick={() => redirect(`${pathname}/${EDIT}/${uuid}`)} />);
    }

    if (isViewActionEnabled) {
      cardActions.push(<EyeOutlined key="detail" onClick={() => redirect(`${pathname}/${DETAIL}/${uuid}`)} />);
    }
  }

  return (
    <>
      <Card style={{ width: 300 }} actions={cardActions}>
        <div style={{ display: 'flex' }}>
          {leftContent && <div style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 16 }}>{leftContent}</div>}
          <Meta title={title} description={description} />
        </div>
      </Card>
    </>
  );
};

export default ListCard;
