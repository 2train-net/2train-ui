import React, { FC, useContext } from 'react';

import { Switch, Route } from 'react-router-dom';

import { PlanInvitationList, PlanInvitationAccept } from './plan-invitations.module';

import { AuthContext } from 'shared/contexts';
import { NotFoundErrorPage } from 'shared/modules';
import { PrivateRoute } from 'shared/modules/route';
import { PERMISSIONS } from 'shared/constants';
import { PLAN_INVITATIONS, PLAN_INVITATION_ACCEPT } from 'shared/routes';

const PlanInvitations: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute user={user} roles={PERMISSIONS.PLAN_INVITATIONS}>
      <Switch>
        <Route exact path={PLAN_INVITATION_ACCEPT} component={PlanInvitationAccept} />
        <Route exact path={PLAN_INVITATIONS} component={PlanInvitationList} />

        <Route component={NotFoundErrorPage} />
      </Switch>
    </PrivateRoute>
  );
};

export default PlanInvitations;
