import React, { FC } from 'react';

import { IExercisePayload } from 'modules/exercises/shared/model';

import ListCard from 'shared/modules/list-card/list-card.component';
import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IExerciseCard extends IMasterComponent<IExercisePayload> {
  data: IExercisePayload;
}

const ExerciseCard: FC<IExerciseCard> = ({ data }) => {
  return <ListCard uuid={data.uuid} title={data.name} description={data.description} />;
};

export default ExerciseCard;
