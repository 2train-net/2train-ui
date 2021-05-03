import React, { FC, useContext, useEffect, useRef } from 'react';

import { useHistory, useLocation, useRouteMatch } from 'react-router';

import {
  PlanCard,
  PlanInviteForm,
  IPlanPayload,
  IPlanInviteFormValues,
  PLAN_INVITATION_LINK_MODAL,
  PLAN_INVITATION_MODAL,
  COPY_ON_CLIPBOARD_SUCCESSFULLY
} from 'modules/plans/plans.module';

import { MasterList, Message } from 'shared/modules';
import { ModalContext } from 'shared/contexts';
import { DELETE_MODAL } from 'shared/constants';
import { PLANS, INVITE, PLAN_INVITATIONS, DELETE } from 'shared/routes';
import { useCreatePlanInvitationMutation, useGetPlansQuery } from 'shared/generated';

const PlanList: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const modalProvider = useContext(ModalContext);

  const inviteFormRef = useRef<HTMLFormElement>(null);

  const [createPlanInvitation, planInvitationPayload] = useCreatePlanInvitationMutation();

  const redirectToPlans = () => {
    history.push(PLANS);
  };

  const deletePlan = () => {};

  const sendPlanInvitation = async ({ email }: IPlanInviteFormValues) => {
    try {
      const planInvitation = await createPlanInvitation({
        variables: {
          data: { plan: { connect: { uuid } }, user: { connect: { email } } }
        }
      });

      const invitationLink = `${window.origin}${PLAN_INVITATIONS}/${INVITE}/${planInvitation.data?.payload.uuid}`;

      modalProvider.refresh({
        ...PLAN_INVITATION_LINK_MODAL,
        message: invitationLink,
        onConfirm: () => {
          navigator.clipboard.writeText(invitationLink);
          Message.success(COPY_ON_CLIPBOARD_SUCCESSFULLY);
          redirectToPlans();
        }
      });
    } catch (error) {}
  };

  const displayDeleteConfirmation = () => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: deletePlan,
      onCancel: redirectToPlans
    });
  };

  const displayInviteModal = () => {
    modalProvider.show({
      ...PLAN_INVITATION_MODAL,
      contentRender: <PlanInviteForm onSubmit={sendPlanInvitation} formRef={inviteFormRef} />,
      onConfirm: () => {
        inviteFormRef?.current?.dispatchEvent(new Event('submit'));
      },
      onCancel: redirectToPlans
    });
  };

  useEffect(() => {
    const { pathname } = location;

    if (pathname.match(DELETE)) {
      displayDeleteConfirmation();
    } else if (pathname.match(INVITE)) {
      displayInviteModal();
    }
  }, [location]);

  useEffect(() => {
    if (planInvitationPayload.error) {
      Message.error(planInvitationPayload.error.graphQLErrors[0].message);
    }

    modalProvider.refresh({ isLoading: planInvitationPayload.loading });
  }, [planInvitationPayload]);

  return <MasterList<IPlanPayload> title="Plans" render={PlanCard} useQuery={useGetPlansQuery} />;
};

export default PlanList;
