import React, { FC, useContext } from 'react';

import { Switch, Route } from 'react-router-dom';

import { PlanList, PlanCreate, PlanUpdate, PlanDetail } from './plans.module';

import { NotFoundErrorPage } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { PrivateRoute } from 'shared/modules/route';
import { PERMISSIONS } from 'shared/constants';
import { PLANS, PLAN_ADD, PLAN_DELETE, PLAN_DETAIL, PLAN_EDIT, PLAN_INVITE } from 'shared/routes';

const Plans: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute user={user} roles={PERMISSIONS.PLANS}>
      <Switch>
        <Route exact path={PLAN_ADD} component={PlanCreate} />
        <Route exact path={PLAN_EDIT} component={PlanUpdate} />
        <Route exact path={PLAN_DETAIL} component={PlanDetail} />
        <Route exact path={[PLANS, PLAN_DELETE, PLAN_INVITE]} component={PlanList} />

        <Route component={NotFoundErrorPage} />
      </Switch>
    </PrivateRoute>
  );
};

export default Plans;
