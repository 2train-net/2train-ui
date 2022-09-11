import React, { FC, useContext } from 'react';

import { IExercisePayload } from 'modules/exercises/shared/model';

import ListCard from 'shared/modules/list-card/list-card.component';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

import { AuthContext } from 'shared/contexts';
import { ExerciseService } from 'shared/services';
import { NONE_TEXT } from 'shared/constants';
import { UserType } from 'shared/generated';

interface IExerciseCard extends IMasterComponent<IExercisePayload> {
  data: IExercisePayload;
}

const ExerciseCard: FC<IExerciseCard> = ({ data }) => {
  const { user } = useContext(AuthContext);

  const isPersonalTrainer = user?.type === UserType.PersonalTrainer;
  const isPublicExercise = user?.uuid !== data.user.uuid;

  return (
    <ListCard
      image={data.image}
      uuid={data.uuid}
      title={data.name}
      description={ExerciseService.parseMuscleGroup(data.muscleGroups[0]) ?? NONE_TEXT}
      isDeleteActionEnabled={!isPersonalTrainer}
      isEditActionEnabled={isPersonalTrainer && !isPublicExercise}
      isDetailActionEnabled={isPersonalTrainer && isPublicExercise}
    />
  );
};

export default ExerciseCard;
