import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { WorkoutRoutineUpdate } from 'modules/workout-routines/workout-routines.module';

import { PrivateRoute } from 'shared/modules/route';
import { WORKOUT_ROUTINE_EDIT } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules';

const WorkoutRoutines: FC = () => (
  <Switch>
    <PrivateRoute exact path={WORKOUT_ROUTINE_EDIT} component={WorkoutRoutineUpdate} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default WorkoutRoutines;
