import React, { FC } from 'react';

import { Route, Redirect, useLocation, Switch } from 'react-router-dom';

import { ThemeProvider } from 'react-jss';

import Navigation from 'modules/navigation/navigation.module';
import Home from 'modules/home/home.module';
import Auth from 'modules/auth/auth.module';
import Profile from 'modules/profile/profile.module';
import Plans from 'modules/plans/plans.module';
import BodyMeasure from 'modules/body-measure/body-measure.module';
import Exercises from 'modules/exercises/exercises.module';
import WorkoutRoutines from 'modules/workout-routines/workout-routines.module';
import PlanInvitations from 'modules/plan-invitations/plan-invitations.module';
import Clients from 'modules/clients/clients.module';
import Workouts from 'modules/workouts/workouts.module';
import Meals from 'modules/meals/meals.module';
import Training from 'modules/training/training.module';

import { NotFoundErrorPage, ErrorBoundary } from 'shared/modules';
import { AuthProvider, ModalProvider } from 'shared/contexts';
import { LIGHT_THEME } from 'shared/theme';
import {
  ROOT,
  HOME,
  PROFILE,
  PLANS,
  WORKOUT_ROUTINES,
  BODY_MEASURES,
  EXERCISES,
  PLAN_INVITATIONS,
  CLIENTS,
  WORKOUTS,
  MEALS,
  TRAINING
} from 'shared/routes';

import './app.css';

const App: FC = () => {
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <ErrorBoundary>
        <AuthProvider>
          <ModalProvider>
            <Route path={ROOT} component={Auth} />
            <Navigation>
              <Switch>
                <Route exact path={ROOT} component={Home} />
                <Route exact path={HOME} component={Home} />
                <Route exact path={PROFILE} component={Profile} />
                <Route path={WORKOUT_ROUTINES} component={WorkoutRoutines} />
                <Route path={PLANS} component={Plans} />
                <Route path={PLAN_INVITATIONS} component={PlanInvitations} />
                <Route path={EXERCISES} component={Exercises} />
                <Route path={BODY_MEASURES} component={BodyMeasure} />
                <Route path={CLIENTS} component={Clients} />
                <Route path={WORKOUTS} component={Workouts} />
                <Route path={MEALS} component={Meals} />
                <Route path={TRAINING} component={Training} />

                <Route component={NotFoundErrorPage} />
                <Redirect to={pathname} />
              </Switch>
            </Navigation>
          </ModalProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
