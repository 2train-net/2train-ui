import React, { FC } from 'react';

import { Card } from 'antd';

import PlanForm from 'modules/plans/shared/components/plan-form/plan-form.component';

import { IPlanFormValues } from 'modules/plans/shared/components/plan-form/plan-form.util';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { useCreatePlanMutation } from 'shared/generated';

const PlanCreate: FC = () => {
  const [createPlan] = useCreatePlanMutation();

  const onSubmit = async (data: IPlanFormValues) => {
    await createPlan({
      variables: {
        data
      }
    });
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
