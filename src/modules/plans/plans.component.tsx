import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PlanList } from './plans.module';

import { PLANS } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';

const Plans = () => (
  <Switch>
    <Route exact path={PLANS} component={PlanList} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Plans;
