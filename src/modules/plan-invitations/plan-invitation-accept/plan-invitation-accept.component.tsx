import React, { FC, useContext, useEffect, useRef } from 'react';

import { useHistory, useRouteMatch } from 'react-router';

import {
  PlanAcceptInviteForm,
  IPlanAcceptInviteFormValues,
  PLAN_INVITATION_ACCEPT_MODAL,
  PLAN_INVITATION_ACCEPTED_SUCCESSFULLY
} from 'modules/plan-invitations/plan-invitations.module';

import { Message } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { DETAIL, PLANS, PLAN_INVITATIONS } from 'shared/routes';
import { useAcceptPlanInvitationMutation, useGetPlanInvitationQuery } from 'shared/generated';

const PlanInvitationList: FC = () => {
  const history = useHistory();
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const inviteFormRef = useRef<HTMLFormElement>(null);

  const { user } = useContext(AuthContext);
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

  const onSubmit = async ({ startAt }: IPlanAcceptInviteFormValues) => {
    try {
      const planInvitation = await acceptPlanInvitation({
        variables: {
          data: {
            uuid,
            startAt
          }
        }
      });

      Message.success(PLAN_INVITATION_ACCEPTED_SUCCESSFULLY);

      modalProvider.close();

      redirectToPlan(planInvitation?.data?.payload.link);
    } catch (error) {}
  };

  const confirmPlanInvitation = async () => {
    inviteFormRef?.current?.dispatchEvent(new Event('submit'));
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
        contentRender: (
          <PlanAcceptInviteForm
            onSubmit={onSubmit}
            formRef={inviteFormRef}
            currentActivePlan={user?.currentActivePlan}
          />
        ),
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
