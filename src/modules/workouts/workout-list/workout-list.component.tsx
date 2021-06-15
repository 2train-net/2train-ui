import React, { FC, useContext } from 'react';

import {
  WorkoutCard,
  IWorkoutPayload,
  PLURAL_WORKOUTS_TITLE,
  SINGULAR_WORKOUTS_TITLE
} from 'modules/workouts/workouts.module';

import { MasterList } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { useGetWorkoutsQuery, UserType } from 'shared/generated';
import { WorkoutRoutineService } from 'shared/services';

const WorkoutList: FC = () => {
  const { user } = useContext(AuthContext);

  const workoutExercises = WorkoutRoutineService.getActiveWorkoutExercises(user?.currentActivePlan?.workoutRoutine);

  const isCustomerAndHasRoutine = user?.type === UserType.Customer && !!workoutExercises?.length;

  return (
    <MasterList<IWorkoutPayload>
      title={[SINGULAR_WORKOUTS_TITLE, PLURAL_WORKOUTS_TITLE]}
      render={WorkoutCard}
      useQuery={useGetWorkoutsQuery}
      isCreateButtonAvailable={isCustomerAndHasRoutine}
    />
  );
};

export default WorkoutList;
