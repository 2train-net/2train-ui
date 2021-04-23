import React, { FC, ReactNode } from 'react';

import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Card } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

interface IListCard {
  uuid: string;
  title: string | ReactNode;
  description: string | ReactNode;
}

const { Meta } = Card;

const ListCard: FC<IListCard> = ({ uuid, title, description }) => {
  const location = useLocation();
  const history = useHistory();

  const redirect = history.push;
  const { pathname } = location;

  return (
    <>
      <Card
        style={{ width: 300 }}
        actions={[
          <DeleteOutlined key="delete" onClick={() => redirect(`${pathname}/delete/${uuid}`)} />,
          <EditOutlined key="edit" onClick={() => redirect(`${pathname}/edit/${uuid}`)} />,
          <EyeOutlined key="detail" onClick={() => redirect(`${pathname}/detail/${uuid}`)} />
        ]}
      >
        <Meta title={title} description={description} />
      </Card>
    </>
  );
};

export default ListCard;
