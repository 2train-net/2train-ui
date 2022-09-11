import React, { FC } from 'react';

import { Switch, Redirect } from 'react-router-dom';

import { ExerciseList, ExerciseCreate, ExerciseUpdate } from './exercises.module';

import { PrivateRoute } from 'shared/modules/route';

import { EXERCISES, EXERCISE_ADD, EXERCISE_EDIT, EXERCISE_DELETE, NOT_FOUND, EXERCISE_DETAIL } from 'shared/routes';

const Exercises: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={EXERCISE_DETAIL} component={ExerciseUpdate} />

      <PrivateRoute exact path={EXERCISE_ADD} component={ExerciseCreate} />

      <PrivateRoute exact path={EXERCISE_EDIT} component={ExerciseUpdate} />

      <PrivateRoute exact path={EXERCISE_DELETE} component={ExerciseList} />

      <PrivateRoute exact path={EXERCISES} component={ExerciseList} />

      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default Exercises;
