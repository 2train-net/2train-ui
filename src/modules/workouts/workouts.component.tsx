import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { WorkoutList } from 'modules/workouts/workouts.module';

import { WORKOUTS } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules';

const Workouts: FC = () => (
  <Switch>
    <Route exact path={WORKOUTS} component={WorkoutList} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Workouts;
