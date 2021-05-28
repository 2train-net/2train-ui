import React, { FC, useContext } from 'react';

import { IExercisePayload } from 'modules/exercises/shared/model';

import ListCard from 'shared/modules/list-card/list-card.component';

import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated';
import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IExerciseCard extends IMasterComponent<IExercisePayload> {
  data: IExercisePayload;
}

const ExerciseCard: FC<IExerciseCard> = ({ data }) => {
  const { user } = useContext(AuthContext);

  const isPersonalTrainer = user?.type === UserType.PersonalTrainer;

  return (
    <ListCard
      uuid={data.uuid}
      title={data.name}
      description={data.description}
      isDeleteActionEnabled={isPersonalTrainer}
      isEditActionEnabled={isPersonalTrainer}
    />
  );
};

export default ExerciseCard;
