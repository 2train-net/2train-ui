import React, { FC, useEffect } from 'react';

import { Redirect, useRouteMatch } from 'react-router-dom';

import { useGetWorkoutRoutineQuery } from 'shared/generated';

import {
  ExerciseItemCard,
  WorkoutExerciseItemCard,
  WorkoutExerciseDetail,
  WORKOUT_EXERCISE_MODAL,
  parseWorkoutExerciseToItem
} from 'modules/workout-routines/workout-routines.module';

import { NOT_FOUND } from 'shared/routes';
import { WorkoutRoutineService } from 'shared/services';
import { WORKOUT_ROUTINE_TEXT } from 'shared/constants';
import { DragAndDropRoutine, Message } from 'shared/modules';

const WorkoutRoutineDetail: FC = () => {
  const { getMaxDay } = WorkoutRoutineService;

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const workoutRoutine = useGetWorkoutRoutineQuery({
    fetchPolicy: 'network-only',
    variables: {
      where
    }
  });

  const notFound = !workoutRoutine.data?.payload && !workoutRoutine.loading;

  useEffect(() => {
    if (workoutRoutine.error) {
      Message.error(workoutRoutine.error.graphQLErrors[0].message);
    }
  }, [workoutRoutine.error]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <DragAndDropRoutine
      routineTitle={WORKOUT_ROUTINE_TEXT}
      data={parseWorkoutExerciseToItem(workoutRoutine.data?.payload.workoutExercises)}
      renderColumnCard={WorkoutExerciseItemCard}
      renderOptionCard={ExerciseItemCard}
      renderDetail={WorkoutExerciseDetail}
      formModal={WORKOUT_EXERCISE_MODAL}
      isEditModeEnabled={false}
      isLoading={workoutRoutine.loading}
      maxColumn={getMaxDay(workoutRoutine.data?.payload.workoutExercises)}
    />
  );
};

export default WorkoutRoutineDetail;
