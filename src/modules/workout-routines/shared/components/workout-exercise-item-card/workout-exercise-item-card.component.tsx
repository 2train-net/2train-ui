import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import ListCard from 'shared/modules/list-card/list-card.component';

import { parseItemToWorkoutExerciseCard } from 'modules/workout-routines/workout-routines.module';

import { UserType } from 'shared/generated';
import { AuthContext } from 'shared/contexts';
import { LBS_TEXT, SECONDS_TEXT } from 'shared/constants';
import { ACTION, DELETE, DETAIL, EDIT, UUID } from 'shared/routes';
import { ColumnItem } from 'shared/modules/drag-and-drop-routine/shared/model/column-items.interface';

interface IWorkoutExerciseItemCardValues {
  data: ColumnItem;
}

const WorkoutExerciseItemCard: FC<IWorkoutExerciseItemCardValues> = ({ data }) => {
  const { user } = useContext(AuthContext);

  const history = useHistory();

  const redirect = history.push;

  const { uuid, exercise, sets, reps, weight, seconds } = parseItemToWorkoutExerciseCard(data);

  const isClient = user?.type === UserType.Customer;

  return (
    <ListCard
      uuid={uuid}
      title={exercise.name}
      description={`
        ${sets}
        ${reps && reps > 0 ? ' x ' + reps : ''} 
        ${seconds && seconds > 0 ? ' x ' + seconds + ' ' + SECONDS_TEXT : ''} 
        ${weight ? ' | ' + weight + ' ' + LBS_TEXT + ' ' : ''}  
      `}
      onEdit={() => redirect(`?&${ACTION}=${EDIT}&${UUID}=${uuid}`)}
      onDelete={() => redirect(`?&${ACTION}=${DELETE}&${UUID}=${uuid}`)}
      onDetail={() => redirect(`?&${ACTION}=${DETAIL}&${UUID}=${uuid}`)}
      isDeleteActionEnabled={!isClient}
      isEditActionEnabled={!isClient}
      isDetailActionEnabled={isClient}
    />
  );
};

export default WorkoutExerciseItemCard;
