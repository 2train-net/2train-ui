import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { Card } from 'antd';

import { CREATE_PLAN_TITLE, PlanForm } from 'modules/plans/plans.module';

import { IPlanFormValues, parsePlanFocusToFlags } from 'modules/plans/shared/components/plan-form/plan-form.util';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { PLANS } from 'shared/routes';
import { useCreatePlanMutation } from 'shared/generated';

const PlanCreate: FC = () => {
  const history = useHistory();

  const [createPlan, { loading }] = useCreatePlanMutation();

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

  return (
    <>
      <FormHeader title={CREATE_PLAN_TITLE} />
      <br />
      <Card>
        <PlanForm onSubmit={onSubmit} isLoading={loading} />
      </Card>
    </>
  );
};

export default PlanCreate;
