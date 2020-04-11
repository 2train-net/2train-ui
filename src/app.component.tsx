import React, { FC } from 'react';
import { Route } from 'react-router-dom';

import Navigation from 'modules/navigation/navigation.module';
import Home from 'modules/home/home.module';
import Auth from 'modules/auth/auth.module';
import WorkoutRoutine, { WorkoutRoutineProvider } from 'modules/workout-routine/workout-routine.module';

import { AuthProvider } from 'shared/contexts';
import { ROOT, HOME, WORKOUT_ROUTINES } from 'shared/routes';

import './app.css';

const App: FC = () => (
  <AuthProvider>
    <Route path={ROOT} component={Auth} />

    <Navigation>
      <Route exact path={HOME} component={Home} />
      <WorkoutRoutineProvider>
        <Route exact path={WORKOUT_ROUTINES} component={WorkoutRoutine} />
      </WorkoutRoutineProvider>
    </Navigation>
  </AuthProvider>
);
export default App;
