import React, { FC } from 'react';

import { Redirect, useRouteMatch } from 'react-router-dom';

import { useGetWorkoutRoutineQuery } from 'shared/generated';

import { DragAndDropRoutine } from 'modules/workout-routines/workout-routines.module';

import { NOT_FOUND } from 'shared/routes';
import { useErrorHandler } from 'shared/hooks';

const WorkoutRoutineDetail: FC = () => {
  const {
    params: { uuid },
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const workoutRoutine = useGetWorkoutRoutineQuery({
    fetchPolicy: 'network-only',
    variables: {
      where,
    },
  });

  const notFound = !workoutRoutine.data?.payload && !workoutRoutine.loading;

  useErrorHandler(workoutRoutine.error);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <DragAndDropRoutine
      workoutRoutine={workoutRoutine.data?.payload}
      isEditAvailable={false}
      isLoading={workoutRoutine.loading}
    />
  );
};

export default WorkoutRoutineDetail;
