import React, { FC } from 'react';

import { IExercisePayload } from 'modules/exercises/shared/model/exercise-payload.interface';

import { NONE_TEXT } from 'shared/constants';
import ListCard from 'shared/modules/list-card/list-card.component';

interface IExerciseCardValues {
  data: IExercisePayload;
}

const ExerciseItemCard: FC<IExerciseCardValues> = ({ data }) => {
  return (
    <ListCard
      uuid={data.uuid}
      title={data.name}
      description={data.description ? data.description : NONE_TEXT}
      emptyActions={true}
    />
  );
};

export default ExerciseItemCard;
