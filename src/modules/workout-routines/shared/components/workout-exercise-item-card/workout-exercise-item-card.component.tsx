import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import ListCard from 'shared/modules/list-card/list-card.component';

import { parseItemToWorkoutExerciseCard } from 'modules/workout-routines/workout-routines.module';

import { ColumnItem } from 'shared/modules/drag-and-drop-routine/shared/model/column-items.interface';
import { ACTION, DELETE, DETAIL, EDIT } from 'shared/routes';
import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated';

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
        ${'Sets: ' + sets}
        ${reps && reps > 0 ? ' x ' + reps : ''} 
        ${seconds && seconds > 0 ? ' x ' + seconds + ' seconds' : ''} 
        ${weight ? ' | Weight: ' + weight + 'lbs ' : ''}  
      `}
      onEdit={() => redirect(`?&${ACTION}=${EDIT}&uuid=${uuid}`)}
      onDelete={() => redirect(`?&${ACTION}=${DELETE}&uuid=${uuid}`)}
      onDetail={() => redirect(`?&${ACTION}=${DETAIL}&uuid=${uuid}`)}
      isDeleteActionEnabled={!isClient}
      isEditActionEnabled={!isClient}
      isDetailActionEnabled={isClient}
    />
  );
};

export default WorkoutExerciseItemCard;
