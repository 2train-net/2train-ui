import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { CREATE_PLAN_TITLE, PlanForm } from 'modules/plans/plans.module';

import { IPlanFormValues, parsePlanFocusToFlags } from 'modules/plans/shared/components/plan-form/plan-form.util';

import { PLANS } from 'shared/routes';
import { FormPage } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { useErrorHandler } from 'shared/hooks';
import { useCreatePlanMutation } from 'shared/generated';

const PlanCreate: FC = () => {
  const history = useHistory();
  const { user, refreshUser } = useContext(AuthContext);

  const [createPlan, { loading, error }] = useCreatePlanMutation();

  useErrorHandler(error);

  const redirectToPlans = () => {
    history.push(PLANS);
  };

  const onSubmit = async ({ focus, ...data }: IPlanFormValues) => {
    try {
      if (!loading) {
        await createPlan({
          variables: {
            data: {
              ...data,
              ...parsePlanFocusToFlags[focus]
            }
          }
        });

        if (!user?.progress.hasPlans) {
          refreshUser({
            ...user!,
            progress: {
              ...user?.progress!,
              hasPlans: true
            }
          });
        }

        redirectToPlans();
      }
    } catch (error) {}
  };

  return (
    <FormPage title={CREATE_PLAN_TITLE}>
      <PlanForm onSubmit={onSubmit} isLoading={loading} />
    </FormPage>
  );
};

export default PlanCreate;
