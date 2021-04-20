import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { Card } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import { IExercise } from 'modules/exercises/shared/model';

import { EXERCISES } from 'shared/routes';
import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IExerciseCard extends IMasterComponent<IExercise> {
  data: IExercise;
}

const { Meta } = Card;

const ExerciseCard: FC<IExerciseCard> = ({ data }) => {
  const history = useHistory();

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <DeleteOutlined key="delete" />,
        <EditOutlined key="edit" onClick={() => history.push(`${EXERCISES}/edit/${data.uuid}`)} />,
        <EyeOutlined key="detail" />
      ]}
    >
      <Meta title={`${data.name}`} description={`${data.description}`} />
    </Card>
  );
};

export default ExerciseCard;
