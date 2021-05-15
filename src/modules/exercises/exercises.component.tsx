import React, { FC, useContext } from 'react';

import { Switch, Route } from 'react-router-dom';

import { ExerciseList, ExerciseCreate, ExerciseUpdate } from './exercises.module';

import { AuthContext } from 'shared/contexts';
import { NotFoundErrorPage } from 'shared/modules';
import { PrivateRoute } from 'shared/modules/route';
import { PERMISSIONS } from 'shared/constants';
import { EXERCISES, EXERCISE_ADD, EXERCISE_EDIT, EXERCISE_DELETE } from 'shared/routes';

const Exercises: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute user={user} roles={PERMISSIONS.EXERCISES}>
      <Switch>
        <Route exact path={EXERCISE_ADD} component={ExerciseCreate} />
        <Route exact path={EXERCISE_EDIT} component={ExerciseUpdate} />
        <Route exact path={[EXERCISES, EXERCISE_DELETE]} component={ExerciseList} />

        <Route component={NotFoundErrorPage} />
      </Switch>
    </PrivateRoute>
  );
};

export default Exercises;
