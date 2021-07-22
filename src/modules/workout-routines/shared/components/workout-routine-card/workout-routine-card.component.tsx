import React, { FC } from 'react';

import { IWorkoutRoutinePayload } from 'modules/workout-routines/shared/model';

import ListCard from 'shared/modules/list-card/list-card.component';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IWorkoutRoutineCard extends IMasterComponent<IWorkoutRoutinePayload> {
  data: IWorkoutRoutinePayload;
}

const ExerciseCard: FC<IWorkoutRoutineCard> = ({ data }) => {
  return (
    <ListCard
      uuid={data.uuid}
      title={data.name}
      isDeleteActionEnabled
      isEditActionEnabled
      isDetailActionEnabled={false}
    />
  );
};

export default ExerciseCard;
