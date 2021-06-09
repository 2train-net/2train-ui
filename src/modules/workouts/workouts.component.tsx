import React, { FC } from 'react';

import { Redirect, Switch, useLocation } from 'react-router-dom';

import { WorkoutList } from 'modules/workouts/workouts.module';

import { NOT_FOUND, TRAINING, WORKOUTS, WORKOUT_ADD } from 'shared/routes';
import { PrivateRoute } from 'shared/modules/route';

const Workouts: FC = () => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <Switch>
      <PrivateRoute exact path={WORKOUTS} component={WorkoutList} />

      {pathname === WORKOUT_ADD ? <Redirect to={TRAINING} /> : <Redirect to={NOT_FOUND} />}
    </Switch>
  );
};

export default Workouts;
