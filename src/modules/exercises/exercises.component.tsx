import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ExerciseList, ExerciseAdd, ExerciseEdit } from './exercises.module';

import { EXERCISES, EXERCISE_ADD, EXERCISE_EDIT } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';

const Exercises = () => (
  <Switch>
    <Route exact path={EXERCISES} component={ExerciseList} />
    <Route exact path={EXERCISE_ADD} component={ExerciseAdd} />
    <Route exact path={EXERCISE_EDIT} component={ExerciseEdit} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Exercises;
