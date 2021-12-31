import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';

import {
  PlanInvitationCard,
  IPlanInvitationPayload,
  SINGULAR_PLAN_INVITATIONS_TITLE,
  PLURAL_PLAN_INVITATIONS_TITLE,
} from 'modules/plan-invitations/plan-invitations.module';

import { MasterList } from 'shared/modules';
import { DELETE, PLAN_INVITATIONS } from 'shared/routes';
import { AuthContext, ModalContext } from 'shared/contexts';
import { DELETE_MODAL, EMAIL_TEXT, NAME_TEXT, PLAN_TEXT } from 'shared/constants';
import { PlanInvitationWhereInput, useGetPlanInvitationsQuery, UserType } from 'shared/generated';

const PlanInvitationList: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const modalProvider = useContext(ModalContext);

  const isPersonalTrainer = user?.type === UserType.PersonalTrainer;

  const redirectToPlanInvitations = () => {
    history.push(PLAN_INVITATIONS);
  };

  const deletePlanInvitation = () => {};

  const displayDeleteConfirmation = () => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: deletePlanInvitation,
      onCancel: redirectToPlanInvitations,
    });
  };

  useEffect(() => {
    if (location.pathname.match(DELETE)) {
      displayDeleteConfirmation();
    }
  }, [location]);

  return (
    <MasterList<IPlanInvitationPayload, PlanInvitationWhereInput>
      title={[SINGULAR_PLAN_INVITATIONS_TITLE, PLURAL_PLAN_INVITATIONS_TITLE]}
      render={PlanInvitationCard}
      isCreateButtonAvailable={isPersonalTrainer}
      useQuery={useGetPlanInvitationsQuery}
      filters={[
        { label: EMAIL_TEXT, value: 'user.email' },
        { label: NAME_TEXT, value: 'user.firstName' },
        { label: PLAN_TEXT, value: 'plan.name' },
      ]}
    />
  );
};

export default PlanInvitationList;
