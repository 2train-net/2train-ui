import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { WorkoutRoutineUpdate } from 'modules/workout-routines/workout-routines.module';

import { WORKOUT_ROUTINE_EDIT } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules';

const WorkoutRoutines: FC = () => (
  <Switch>
    <Route exact path={WORKOUT_ROUTINE_EDIT} component={WorkoutRoutineUpdate} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default WorkoutRoutines;
