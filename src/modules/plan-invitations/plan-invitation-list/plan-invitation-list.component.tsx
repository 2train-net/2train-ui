import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';

import {
  PlanInvitationCard,
  IPlanInvitationPayload,
  SINGULAR_PLAN_INVITATIONS_TITLE,
  PLURAL_PLAN_INVITATIONS_TITLE
} from 'modules/plan-invitations/plan-invitations.module';

import { MasterList } from 'shared/modules';
import { ModalContext } from 'shared/contexts';
import { DELETE_MODAL } from 'shared/constants';
import { DELETE, PLAN_INVITATIONS } from 'shared/routes';
import { useGetPlanInvitationsQuery } from 'shared/generated';

const PlanInvitationList: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const modalProvider = useContext(ModalContext);

  const redirectToPlanInvitations = () => {
    history.push(PLAN_INVITATIONS);
  };

  const deletePlanInvitation = () => {};

  const displayDeleteConfirmation = () => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: deletePlanInvitation,
      onCancel: redirectToPlanInvitations
    });
  };

  useEffect(() => {
    if (location.pathname.match(DELETE)) {
      displayDeleteConfirmation();
    }
  }, [location]);

  return (
    <MasterList<IPlanInvitationPayload>
      title={[SINGULAR_PLAN_INVITATIONS_TITLE, PLURAL_PLAN_INVITATIONS_TITLE]}
      render={PlanInvitationCard}
      isCreateButtonAvailable={false}
      useQuery={useGetPlanInvitationsQuery}
    />
  );
};

export default PlanInvitationList;
