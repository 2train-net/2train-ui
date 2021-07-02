import React, { FC } from 'react';

import { Redirect, Switch } from 'react-router-dom';

import { SettingLayout } from './settings.module';

import { PrivateRoute } from 'shared/modules/route';
import { NOT_FOUND, SETTINGS } from 'shared/routes';

const WorkoutRoutines: FC = () => (
  <Switch>
    <PrivateRoute exact path={SETTINGS} component={SettingLayout} />

    <Redirect to={NOT_FOUND} />
  </Switch>
);

export default WorkoutRoutines;
