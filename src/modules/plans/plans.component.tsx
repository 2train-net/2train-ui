import React, { FC } from 'react';

import { Switch, Route } from 'react-router-dom';

import { PlanList, PlanCreate, PlanUpdate, PlanDetail } from './plans.module';

import { NotFoundErrorPage } from 'shared/modules';
import { PLANS, PLAN_ADD, PLAN_DELETE, PLAN_DETAIL, PLAN_EDIT, PLAN_INVITE } from 'shared/routes';

const Plans: FC = () => (
  <Switch>
    <Route exact path={PLAN_ADD} component={PlanCreate} />
    <Route exact path={PLAN_EDIT} component={PlanUpdate} />
    <Route exact path={PLAN_DETAIL} component={PlanDetail} />
    <Route exact path={[PLANS, PLAN_DELETE, PLAN_INVITE]} component={PlanList} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Plans;
