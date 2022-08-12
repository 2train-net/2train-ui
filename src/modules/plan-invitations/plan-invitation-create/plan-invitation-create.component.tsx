import React, { FC, useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import {
  PlanInvitationForm,
  IPlanInvitationFormValues,
  CREATE_PLAN_INVITATION_TITLE,
  INITIAL_PLAN_INVITATION_FORM_VALUES,
} from 'modules/plan-invitations/plan-invitations.module';

import { FormPage } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { useErrorHandler } from 'shared/hooks';
import { PLAN_INVITATIONS } from 'shared/routes';
import { useCreatePlanInvitationMutation } from 'shared/generated';

const PlanInvitationCreate: FC = () => {
  const history = useHistory();
  const { user, refreshUser } = useContext(AuthContext);

  const { search } = useLocation();

  const [, uuid] = search.split('=');

  const [createPlanInvitation, { loading, error }] = useCreatePlanInvitationMutation();

  useErrorHandler(error);

  const redirectToPlanInvitations = () => {
    history.push(PLAN_INVITATIONS);
  };

  const onSubmit = async ({ uuid, email, firstName, lastName, isNewUser, startAt }: IPlanInvitationFormValues) => {
    try {
      if (!loading) {
        await createPlanInvitation({
          variables: {
            data: {
              user: isNewUser
                ? {
                    invite: {
                      email,
                      firstName,
                      lastName,
                    },
                  }
                : {
                    connect: {
                      email,
                    },
                  },
              plan: {
                connect: {
                  uuid,
                },
              },
              startAt,
            },
          },
        });

        if (!user?.progress.hasPlanInvitations) {
          refreshUser({
            ...user!,
            progress: {
              ...user?.progress!,
              hasPlanInvitations: true,
            },
          });
        }

        redirectToPlanInvitations();
      }
    } catch (error) {}
  };

  return (
    <FormPage title={CREATE_PLAN_INVITATION_TITLE}>
      <PlanInvitationForm
        onSubmit={onSubmit}
        isLoading={loading}
        initialValues={{ ...INITIAL_PLAN_INVITATION_FORM_VALUES, uuid }}
      />
    </FormPage>
  );
};

export default PlanInvitationCreate;
