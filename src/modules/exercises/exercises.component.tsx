import React, { FC } from 'react';

import { Switch, Route } from 'react-router-dom';

import { ExerciseList, ExerciseCreate, ExerciseUpdate } from './exercises.module';

import { NotFoundErrorPage } from 'shared/modules';
import { EXERCISES, EXERCISE_ADD, EXERCISE_EDIT, EXERCISE_DELETE } from 'shared/routes';

const Exercises: FC = () => (
  <Switch>
    <Route exact path={EXERCISE_ADD} component={ExerciseCreate} />
    <Route exact path={EXERCISE_EDIT} component={ExerciseUpdate} />
    <Route exact path={[EXERCISES, EXERCISE_DELETE]} component={ExerciseList} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Exercises;
