import React, { FC } from 'react';
import { Route } from 'react-router-dom';

import Navigation from 'modules/navigation/navigation.module';
import Home from 'modules/home/home.module';
import WorkoutRoutine from 'modules/workout-routine/workout-routine.module';

import { ROOT, WORKOUT_ROUTINE } from 'shared/routes';

import './app.css';

const App: FC = () => (
  <Navigation>
    <Route exact path={ROOT} component={Home} />
    <Route exact path={WORKOUT_ROUTINE} component={WorkoutRoutine} />
  </Navigation>
);

export default App;
