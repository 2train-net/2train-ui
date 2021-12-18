import React, { FC } from 'react';

import { Switch, Redirect } from 'react-router-dom';

import { PlanInvitationList, PlanInvitationCreate, PlanInvitationAccept } from './plan-invitations.module';

import { PrivateRoute } from 'shared/modules/route';
import { NOT_FOUND, PLAN_INVITATIONS, PLAN_INVITATION_ADD, PLAN_INVITATION_ACCEPT } from 'shared/routes';

const PlanInvitations: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={PLAN_INVITATION_ADD} component={PlanInvitationCreate} />
      <PrivateRoute exact path={PLAN_INVITATION_ACCEPT} component={PlanInvitationAccept} />
      <PrivateRoute exact path={PLAN_INVITATIONS} component={PlanInvitationList} />

      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default PlanInvitations;
