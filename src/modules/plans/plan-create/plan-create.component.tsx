import React, { FC, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { CREATE_PLAN_TITLE, PlanForm } from 'modules/plans/plans.module';

import { IPlanFormValues, parsePlanFocusToFlags } from 'modules/plans/shared/components/plan-form/plan-form.util';

import { PLANS } from 'shared/routes';
import { FormPage, Message } from 'shared/modules';
import { useCreatePlanMutation } from 'shared/generated';

const PlanCreate: FC = () => {
  const history = useHistory();

  const [createPlan, { loading, error }] = useCreatePlanMutation();

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

        redirectToPlans();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  return (
    <FormPage title={CREATE_PLAN_TITLE}>
      <PlanForm onSubmit={onSubmit} isLoading={loading} />
    </FormPage>
  );
};

export default PlanCreate;
