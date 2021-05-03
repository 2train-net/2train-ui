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
}

const { Meta } = Card;

const ListCard: FC<IListCard> = ({ uuid, title, description, emptyActions = false, actions = [] }) => {
  const location = useLocation();
  const history = useHistory();

  const redirect = history.push;
  const { pathname } = location;

  const cardActions: ReactNode[] = actions;

  if (!emptyActions) {
    cardActions.push(
      <DeleteOutlined key="delete" onClick={() => redirect(`${pathname}/${DELETE}/${uuid}`)} />,
      <EditOutlined key="edit" onClick={() => redirect(`${pathname}/${EDIT}/${uuid}`)} />,
      <EyeOutlined key="detail" onClick={() => redirect(`${pathname}/${DETAIL}/${uuid}`)} />
    );
  }

  return (
    <>
      <Card style={{ width: 300 }} actions={cardActions}>
        <Meta title={title} description={description} />
      </Card>
    </>
  );
};

export default ListCard;
