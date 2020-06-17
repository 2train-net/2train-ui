import React, { FC } from 'react';

import { Switch, Route } from 'react-router-dom';

import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';
import { TEAM_CUSTOMERS, TEAM_TRAINERS, TEAM_GYM_BRANCHES } from 'shared/routes';

import { Customers, Trainers, GymBranches } from './team.module';

const Team: FC = () => {
  return (
    <Switch>
      <Route exact path={TEAM_CUSTOMERS} component={Customers} />
      <Route exact path={TEAM_TRAINERS} component={Trainers} />
      <Route exact path={TEAM_GYM_BRANCHES} component={GymBranches} />

      <Route component={NotFoundErrorPage} />
    </Switch>
  );
};

export default Team;
