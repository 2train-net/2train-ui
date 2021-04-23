import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { PlanList, PlanCreate } from './plans.module';

import { PLANS, PLAN_ADD, PLAN_DELETE } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';

const Plans: FC = () => (
  <Switch>
    <Route path={[PLANS, PLAN_DELETE]} component={PlanList} />
    <Route exact path={PLAN_ADD} component={PlanCreate} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Plans;
