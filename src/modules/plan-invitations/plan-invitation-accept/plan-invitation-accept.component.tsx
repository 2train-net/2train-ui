import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useRouteMatch } from 'react-router';

import {
  PLAN_INVITATION_ACCEPT_MODAL,
  PLAN_INVITATION_ACCEPTED_SUCCESSFULLY
} from 'modules/plan-invitations/plan-invitations.module';

import { Message } from 'shared/modules';
import { ModalContext } from 'shared/contexts';
import { DETAIL, PLANS, PLAN_INVITATIONS } from 'shared/routes';
import { useAcceptPlanInvitationMutation, useGetPlanInvitationQuery } from 'shared/generated';

const PlanInvitationList: FC = () => {
  const history = useHistory();
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const modalProvider = useContext(ModalContext);

  const { data, loading, error } = useGetPlanInvitationQuery({
    variables: {
      where: {
        uuid
      }
    },
    fetchPolicy: 'cache-and-network'
  });

  const [acceptPlanInvitation, acceptInvitationPayload] = useAcceptPlanInvitationMutation();

  const redirectToPlan = (link?: string | null) => {
    if (link) {
      history.push(`${PLANS}/${DETAIL}/${link}`);
    } else {
      history.push(PLANS);
    }
  };

  const redirectToPlanInvitations = () => {
    history.push(PLAN_INVITATIONS);
  };

  const confirmPlanInvitation = async () => {
    try {
      const planInvitation = await acceptPlanInvitation({
        variables: {
          data: {
            uuid
          }
        }
      });

      Message.success(PLAN_INVITATION_ACCEPTED_SUCCESSFULLY);

      modalProvider.close();

      redirectToPlan(planInvitation?.data?.payload.link);
    } catch (error) {}
  };

  useEffect(() => {
    if (acceptInvitationPayload.loading || loading) {
      modalProvider.refresh({
        isLoading: true
      });
    }

    if (data?.payload && !loading && !acceptInvitationPayload.loading) {
      const planInvitation = data?.payload;

      modalProvider.refresh({
        isLoading: false,
        title: planInvitation.plan.name,
        message: `
          ${planInvitation.plan.currency} ${planInvitation.plan.price} |
          ${planInvitation.plan.intervalCount} ${planInvitation.plan.intervalPlan}
        `,
        onConfirm: confirmPlanInvitation,
        onCancel: redirectToPlanInvitations
      });
    }

    if (error || acceptInvitationPayload.error) {
      const errorMessage = error?.message || acceptInvitationPayload.error?.graphQLErrors[0].message;

      Message.error(errorMessage);
    }
  }, [data, error, loading, acceptInvitationPayload]);

  useEffect(() => {
    modalProvider.show({
      ...PLAN_INVITATION_ACCEPT_MODAL,
      isLoading: true,
      onConfirm: undefined,
      onCancel: redirectToPlanInvitations
    });
  }, []);

  return <></>;
};

export default PlanInvitationList;
