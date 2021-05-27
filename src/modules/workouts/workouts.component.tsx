import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { WorkoutList } from 'modules/workouts/workouts.module';

import { NOT_FOUND, WORKOUTS } from 'shared/routes';
import { PrivateRoute } from 'shared/modules/route';

const Workouts: FC = () => (
  <Switch>
    <PrivateRoute exact path={WORKOUTS} component={WorkoutList} />
    <Route exact path={WORKOUTS} component={WorkoutList} />

    <Redirect to={NOT_FOUND} />
  </Switch>
);

export default Workouts;
