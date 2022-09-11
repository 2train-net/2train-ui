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
} from 'modules/plans/plans.module';

import { useErrorHandler } from 'shared/hooks';
import { MasterList, Message } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { PLANS, INVITE, PLAN_INVITATIONS } from 'shared/routes';
import { COPY_ON_CLIPBOARD_SUCCESSFULLY_TEXT } from 'shared/constants';
import {
  PlanWhereInput,
  useCreatePlanInvitationMutation,
  useDeletePlanMutation,
  useGetPlansQuery,
  UserType,
} from 'shared/generated';

const PlanList: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const {
    params: { uuid },
  } = useRouteMatch<{ uuid: string }>();

  const { user } = useContext(AuthContext);
  const modalProvider = useContext(ModalContext);

  const inviteFormRef = useRef<HTMLFormElement>(null);

  const [createPlanInvitation, planInvitationPayload] = useCreatePlanInvitationMutation();

  useErrorHandler(planInvitationPayload.error);

  const isPersonalTrainer = user?.type === UserType.PersonalTrainer;

  const redirectToPlans = () => {
    history.push(PLANS);
  };

  const sendPlanInvitation = async ({ email }: IPlanInviteFormValues) => {
    try {
      modalProvider.refresh({ isLoading: true });

      const planInvitation = await createPlanInvitation({
        variables: {
          data: { plan: { connect: { uuid } }, user: { connect: { email } } },
        },
      });

      const invitationLink = `${window.origin}${PLAN_INVITATIONS}/${INVITE}/${planInvitation.data?.payload.uuid}`;

      modalProvider.refresh({
        ...PLAN_INVITATION_LINK_MODAL,
        isLoading: false,
        message: invitationLink,
        onConfirm: () => {
          navigator.clipboard.writeText(invitationLink);
          Message.success(COPY_ON_CLIPBOARD_SUCCESSFULLY_TEXT);
          redirectToPlans();
        },
      });
    } catch (error) {
      modalProvider.refresh({ isLoading: false });
    }
  };

  const displayInviteModal = () => {
    modalProvider.show({
      ...PLAN_INVITATION_MODAL,
      contentRender: <PlanInviteForm onSubmit={sendPlanInvitation} formRef={inviteFormRef} />,
      onConfirm: () => {
        inviteFormRef?.current?.dispatchEvent(new Event('submit'));
      },
      onCancel: redirectToPlans,
    });
  };

  useEffect(() => {
    const { pathname } = location;

    if (pathname.match(INVITE)) {
      displayInviteModal();
    }
  }, [location]);

  return (
    <MasterList<IPlanPayload, PlanWhereInput>
      title={[SINGULAR_PLANS_TITLE, PLURAL_PLANS_TITLE]}
      render={PlanCard}
      isCreateButtonAvailable={isPersonalTrainer}
      useQuery={useGetPlansQuery}
      useDeleteMutation={useDeletePlanMutation}
    />
  );
};

export default PlanList;
