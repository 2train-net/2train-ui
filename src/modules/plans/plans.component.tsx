import React, { FC } from 'react';

import { Switch, Redirect } from 'react-router-dom';

import { PlanList, PlanCreate, PlanUpdate, PlanDetail } from './plans.module';

import { PrivateRoute } from 'shared/modules/route';
import { NOT_FOUND, PLANS, PLAN_ADD, PLAN_DELETE, PLAN_DETAIL, PLAN_EDIT, PLAN_INVITE } from 'shared/routes';

const Plans: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={PLAN_ADD} component={PlanCreate} />

      <PrivateRoute exact path={PLAN_EDIT} component={PlanUpdate} />

      <PrivateRoute exact path={PLAN_DETAIL} component={PlanDetail} />

      <PrivateRoute exact path={PLAN_INVITE} component={PlanList} />

      <PrivateRoute exact path={PLAN_DELETE} component={PlanList} />

      <PrivateRoute exact path={PLANS} component={PlanList} />

      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default Plans;
