import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import ListCard from 'shared/modules/list-card/list-card.component';

import { parseItemToWorkoutExerciseCard } from 'modules/workout-routine/workout-routine.module';

import { ColumnItem } from 'shared/modules/drag-and-drop-routine/column-items.interface';
import { ACTION, DELETE, EDIT } from 'shared/routes';

interface IWorkoutExerciseItemCardValues {
  data: ColumnItem;
}

const WorkoutExerciseItemCard: FC<IWorkoutExerciseItemCardValues> = ({ data }) => {
  const history = useHistory();

  const redirect = history.push;

  const { uuid, exercise, sets, reps, weight, seconds } = parseItemToWorkoutExerciseCard(data);

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
    />
  );
};

export default WorkoutExerciseItemCard;
