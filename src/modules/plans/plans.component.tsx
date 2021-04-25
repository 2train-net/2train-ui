import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { PlanList, PlanCreate, PlanUpdate } from './plans.module';

import { PLANS, PLAN_ADD, PLAN_DELETE, PLAN_EDIT } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';

const Plans: FC = () => (
  <Switch>
    <Route exact path={PLAN_ADD} component={PlanCreate} />
    <Route exact path={PLAN_EDIT} component={PlanUpdate} />
    <Route exact path={[PLANS, PLAN_DELETE]} component={PlanList} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Plans;
