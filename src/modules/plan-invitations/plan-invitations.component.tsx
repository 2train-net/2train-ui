import React, { FC } from 'react';

import { Switch, Route } from 'react-router-dom';

import { PlanInvitationList, PlanInvitationAccept } from './plan-invitations.module';

import { NotFoundErrorPage } from 'shared/modules';
import { PLAN_INVITATIONS, PLAN_INVITATION_ACCEPT } from 'shared/routes';

const PlanInvitations: FC = () => (
  <Switch>
    <Route exact path={PLAN_INVITATION_ACCEPT} component={PlanInvitationAccept} />
    <Route exact path={PLAN_INVITATIONS} component={PlanInvitationList} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default PlanInvitations;
