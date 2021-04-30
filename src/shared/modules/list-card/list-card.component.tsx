import React, { FC, ReactNode, ReactElement } from 'react';

import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Card } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { EDIT, DETAIL, DELETE } from 'shared/routes';

interface IListCard {
  uuid: string;
  title: string | ReactNode;
  description: string | ReactNode;
  actions?: ReactElement[];
}

const { Meta } = Card;

const ListCard: FC<IListCard> = ({ uuid, title, description, actions = [] }) => {
  const location = useLocation();
  const history = useHistory();

  const redirect = history.push;
  const { pathname } = location;

  return (
    <>
      <Card
        style={{ width: 300 }}
        actions={[
          ...actions,
          <DeleteOutlined key="delete" onClick={() => redirect(`${pathname}/${DELETE}/${uuid}`)} />,
          <EditOutlined key="edit" onClick={() => redirect(`${pathname}/${EDIT}/${uuid}`)} />,
          <EyeOutlined key="detail" onClick={() => redirect(`${pathname}/${DETAIL}/${uuid}`)} />
        ]}
      >
        <Meta title={title} description={description} />
      </Card>
    </>
  );
};

export default ListCard;
