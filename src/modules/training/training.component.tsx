import React, { FC } from 'react';

import { Redirect, Switch } from 'react-router-dom';

import {
  TrainingLayout,
  TrainingDayList,
  TrainingProvider,
  TrainingWorkoutDetail,
  TrainingWorkoutExerciseList
} from 'modules/training/training.module';

import { PrivateRoute } from 'shared/modules/route';

import { NOT_FOUND, TRAINING, TRAINING_DETAIL, TRAINING_WORKOUT } from 'shared/routes';

const Training: FC = () => {
  return (
    <TrainingProvider>
      <TrainingLayout>
        <Switch>
          <PrivateRoute exact path={TRAINING_WORKOUT} component={TrainingWorkoutExerciseList} />
          <PrivateRoute exact path={TRAINING_DETAIL} component={TrainingWorkoutDetail} />
          <PrivateRoute exact path={TRAINING} component={TrainingDayList} />

          <Redirect to={NOT_FOUND} />
        </Switch>
      </TrainingLayout>
    </TrainingProvider>
  );
};

export default Training;
