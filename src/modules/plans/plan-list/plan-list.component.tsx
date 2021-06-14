import React, { FC, useContext, useEffect, useRef } from 'react';

import { useHistory, useLocation, useRouteMatch } from 'react-router';

import {
  PlanCard,
  PlanInviteForm,
  IPlanPayload,
  IPlanInviteFormValues,
  PLAN_INVITATION_MODAL,
  SINGULAR_PLANS_TITLE,
  PLURAL_PLANS_TITLE,
  PLAN_INVITATION_LINK_MODAL,
  COPY_ON_CLIPBOARD_SUCCESSFULLY
} from 'modules/plans/plans.module';

import { MasterList, Message } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { PLANS, INVITE, PLAN_INVITATIONS } from 'shared/routes';
import { useCreatePlanInvitationMutation, useDeletePlanMutation, useGetPlansQuery, UserType } from 'shared/generated';

const PlanList: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const { user } = useContext(AuthContext);
  const modalProvider = useContext(ModalContext);

  const inviteFormRef = useRef<HTMLFormElement>(null);

  const [createPlanInvitation, planInvitationPayload] = useCreatePlanInvitationMutation();

  const isPersonalTrainer = user?.type === UserType.PersonalTrainer;

  const redirectToPlans = () => {
    history.push(PLANS);
  };

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

    if (pathname.match(INVITE)) {
      displayInviteModal();
    }
  }, [location]);

  useEffect(() => {
    const error = planInvitationPayload.error;
    const isLoading = planInvitationPayload.loading;

    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }

    modalProvider.refresh({ isLoading });
  }, [planInvitationPayload]);

  return (
    <MasterList<IPlanPayload>
      title={[SINGULAR_PLANS_TITLE, PLURAL_PLANS_TITLE]}
      render={PlanCard}
      isCreateButtonAvailable={isPersonalTrainer}
      useQuery={useGetPlansQuery}
      useDeleteMutation={useDeletePlanMutation}
    />
  );
};

export default PlanList;
