import React, { FC } from 'react';
import { Route, Redirect, useLocation, Switch } from 'react-router-dom';

import Navigation from 'modules/navigation/navigation.module';
import Home from 'modules/home/home.module';
import Auth from 'modules/auth/auth.module';
import WorkoutRoutine from 'modules/workout-routine/workout-routine.module';
import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';

import { AuthProvider } from 'shared/contexts';
import { ROOT, HOME, WORKOUT_ROUTINES } from 'shared/routes';

import './app.css';

const App: FC = () => {
  const { pathname } = useLocation();

  return (
    <AuthProvider>
      <Route path={ROOT} component={Auth} />
      <Navigation>
        <Switch>
          <Route exact path={HOME} component={Home} />
          <Route exact path={WORKOUT_ROUTINES} component={WorkoutRoutine} />
          <Route component={NotFoundErrorPage} />
          <Redirect to={pathname} />
        </Switch>
      </Navigation>
    </AuthProvider>
  );
};
export default App;
