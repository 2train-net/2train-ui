import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import {
  PlanInvitationForm,
  IPlanInvitationFormValues,
  CREATE_PLAN_INVITATION_TITLE
} from 'modules/plan-invitations/plan-invitations.module';

import { FormPage } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { useErrorHandler } from 'shared/hooks';
import { PLAN_INVITATIONS } from 'shared/routes';
import { useCreatePlanInvitationMutation } from 'shared/generated';

const PlanInvitationCreate: FC = () => {
  const history = useHistory();
  const { user, refreshUser } = useContext(AuthContext);

  const [createPlanInvitation, { loading, error }] = useCreatePlanInvitationMutation();

  useErrorHandler(error);

  const redirectToPlanInvitations = () => {
    history.push(PLAN_INVITATIONS);
  };

  const onSubmit = async ({ uuid, email }: IPlanInvitationFormValues) => {
    try {
      if (!loading) {
        await createPlanInvitation({
          variables: {
            data: {
              user: {
                connect: {
                  email
                }
              },
              plan: {
                connect: {
                  uuid
                }
              }
            }
          }
        });

        if (!user?.progress.hasPlanInvitations) {
          refreshUser({
            ...user!,
            progress: {
              ...user?.progress!,
              hasPlanInvitations: true
            }
          });
        }

        redirectToPlanInvitations();
      }
    } catch (error) {}
  };

  return (
    <FormPage title={CREATE_PLAN_INVITATION_TITLE}>
      <PlanInvitationForm onSubmit={onSubmit} isLoading={loading} />
    </FormPage>
  );
};

export default PlanInvitationCreate;
