import React, { FC } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import {
  WorkoutRoutineUpdate,
  WorkoutRoutineDetail,
  WorkoutRoutineList,
  WorkoutRoutineCreate
} from 'modules/workout-routines/workout-routines.module';

import { PrivateRoute } from 'shared/modules/route';
import {
  NOT_FOUND,
  WORKOUT_ROUTINES,
  WORKOUT_ROUTINE_ADD,
  WORKOUT_ROUTINE_DELETE,
  WORKOUT_ROUTINE_DETAIL,
  WORKOUT_ROUTINE_EDIT
} from 'shared/routes';

const WorkoutRoutines: FC = () => (
  <Switch>
    <PrivateRoute exact path={WORKOUT_ROUTINE_ADD} component={WorkoutRoutineCreate} />

    <PrivateRoute exact path={WORKOUT_ROUTINE_EDIT} component={WorkoutRoutineUpdate} />

    <PrivateRoute exact path={WORKOUT_ROUTINE_DETAIL} component={WorkoutRoutineDetail} />

    <PrivateRoute exact path={WORKOUT_ROUTINE_DELETE} component={WorkoutRoutineList} />

    <PrivateRoute exact path={WORKOUT_ROUTINES} component={WorkoutRoutineList} />

    <Redirect to={NOT_FOUND} />
  </Switch>
);

export default WorkoutRoutines;
