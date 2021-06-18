import React, { FC, useContext } from 'react';

import { Redirect } from 'react-router';
import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated';
import { PROFILE, TRAINING } from 'shared/routes';
import { WorkoutRoutineService } from 'shared/services';

const Home: FC = () => {
  const { user, isLoading } = useContext(AuthContext);

  const isCustomer = user?.type === UserType.Customer;

  const workoutExercises = WorkoutRoutineService.getActiveWorkoutExercises(user?.currentActivePlan?.workoutRoutine);

  const url = isCustomer && workoutExercises?.length ? TRAINING : PROFILE;

  return isLoading ? <></> : <Redirect to={url} />;
};

export default Home;
