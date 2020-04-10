import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Navigation from 'modules/navigation/navigation.module';
import Home from 'modules/home/home.module';
import { Login, Register, Profile } from 'modules/auth/auth.module';
import WorkoutRoutine, { WorkoutRoutineProvider } from 'modules/workout-routine/workout-routine.module';

import { ROOT, HOME, WORKOUT_ROUTINES, LOGIN, REGISTER, PROFILE } from 'shared/routes';

import './app.css';

const App: FC = () => {
  const HomeRedirect = () => <Redirect to={HOME} />;

  return (
    <Navigation>
      <Route exact path={ROOT} component={HomeRedirect} />
      <Route exact path={HOME} component={Home} />
      <WorkoutRoutineProvider>
        <Route exact path={WORKOUT_ROUTINES} component={WorkoutRoutine} />
      </WorkoutRoutineProvider>
      <Route exact path={LOGIN} component={Login} />
      <Route exact path={REGISTER} component={Register} />
      <Route exact path={PROFILE} component={Profile} />
    </Navigation>
  );
};

export default App;
