import React, { FC } from 'react';

import { Redirect, Switch } from 'react-router-dom';

import { WorkoutList } from 'modules/workouts/workouts.module';

import { TRAINING, WORKOUTS, WORKOUT_ADD } from 'shared/routes';
import { PrivateRoute } from 'shared/modules/route';

const Workouts: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={WORKOUTS} component={WorkoutList} />
      <PrivateRoute exact path={WORKOUT_ADD} component={() => <Redirect to={TRAINING} />} />
    </Switch>
  );
};

export default Workouts;
