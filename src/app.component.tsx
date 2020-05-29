import React, { FC } from 'react';
import { Route, Redirect, useLocation, Switch } from 'react-router-dom';

import { ThemeProvider } from 'react-jss';

import Navigation from 'modules/navigation/navigation.module';
import Home from 'modules/home/home.module';
import Auth from 'modules/auth/auth.module';
import Profile from 'modules/profile/profile.module';
import BodyMeasure from 'modules/body-measure/body-measure.module';
import WorkoutRoutine from 'modules/workout-routine/workout-routine.module';

import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';

import { AuthProvider } from 'shared/contexts';
import { LIGHT_THEME } from 'shared/theme';
import { ROOT, HOME, PROFILE, WORKOUT_ROUTINES, BODY_MEASURES } from 'shared/routes';

import './app.css';

const App: FC = () => {
  const { pathname } = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider theme={LIGHT_THEME}>
        <Route path={ROOT} component={Auth} />
        <Navigation>
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route exact path={PROFILE} component={Profile} />
            <Route exact path={WORKOUT_ROUTINES} component={WorkoutRoutine} />
            <Route path={BODY_MEASURES} component={BodyMeasure} />

            <Route component={NotFoundErrorPage} />
            <Redirect to={pathname} />
          </Switch>
        </Navigation>
      </ThemeProvider>
    </AuthProvider>
  );
};
export default App;
