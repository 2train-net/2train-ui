import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { Card } from 'antd';

import { PlanForm } from 'modules/plans/plans.module';

import { IPlanFormValues } from 'modules/plans/shared/components/plan-form/plan-form.util';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { PLANS } from 'shared/routes';
import { useCreatePlanMutation } from 'shared/generated';

const PlanCreate: FC = () => {
  const history = useHistory();

  const [createPlan] = useCreatePlanMutation();

  const redirectToPlans = () => {
    history.push(PLANS);
  };

  const onSubmit = async (data: IPlanFormValues) => {
    try {
      await createPlan({
        variables: {
          data
        }
      });

      redirectToPlans();
    } catch (error) {}
  };

  return (
    <>
      <FormHeader title="Create Plan" />
      <br />
      <Card>
        <PlanForm onSubmit={onSubmit} />
      </Card>
    </>
  );
};

export default PlanCreate;
