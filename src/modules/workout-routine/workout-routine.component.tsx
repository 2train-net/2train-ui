import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { WorkoutRoutineUpdate } from 'modules/workout-routine/workout-routine.module';

import { WORKOUT_ROUTINE_EDIT } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules';

const WorkoutRoutine: FC = () => (
  <Switch>
    <Route exact path={WORKOUT_ROUTINE_EDIT} component={WorkoutRoutineUpdate} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default WorkoutRoutine;
