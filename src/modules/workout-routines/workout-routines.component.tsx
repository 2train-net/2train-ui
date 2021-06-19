import React, { FC } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { WorkoutRoutineUpdate } from 'modules/workout-routines/workout-routines.module';

import { NotFoundErrorPage } from 'shared/modules';
import { PrivateRoute } from 'shared/modules/route';
import { NOT_FOUND, WORKOUT_ROUTINE_EDIT } from 'shared/routes';

const WorkoutRoutines: FC = () => (
  <Switch>
    <PrivateRoute exact path={WORKOUT_ROUTINE_EDIT} component={WorkoutRoutineUpdate} />

    <Redirect to={NOT_FOUND} />
  </Switch>
);

export default WorkoutRoutines;
