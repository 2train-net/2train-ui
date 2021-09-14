import React, { FC } from 'react';

import { Switch, Redirect } from 'react-router-dom';

import { DietPlanUpdate } from './diet-plans.module';

import { PrivateRoute } from 'shared/modules/route';
import { NOT_FOUND, DIET_PLAN_EDIT } from 'shared/routes';

const DietPlans: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={DIET_PLAN_EDIT} component={DietPlanUpdate} />
      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default DietPlans;
