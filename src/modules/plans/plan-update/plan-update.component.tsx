import React, { FC } from 'react';

import { Redirect, useLocation } from 'react-router';

import { Card } from 'antd';

import PlanForm from 'modules/plans/shared/components/plan-form/plan-form.component';

import { IPlanFormValues } from 'modules/plans/shared/components/plan-form/plan-form.util';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { GetPlanDocument, useGetPlanQuery, useUpdatePlanMutation } from 'shared/generated';

import { NOT_FOUND } from 'shared/routes';

const PlanUpdate: FC = () => {
  const location = useLocation();

  const [uuid] = location.pathname.split('/').reverse();

  const where = { uuid };

  const { data, loading, error } = useGetPlanQuery({
    variables: {
      where
    }
  });

  const notFound = !data?.payload && !loading;

  const [updatePlan] = useUpdatePlanMutation();

  const onSubmit = async (data: IPlanFormValues) => {
    await updatePlan({
      variables: {
        data,
        where
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          data,
          query: GetPlanDocument,
          variables: {
            where
          }
        });
      }
    });
  };

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <>
      <FormHeader title="Update Plan" />
      <br />
      <Card>
        <PlanForm onSubmit={onSubmit} initialValues={data?.payload} />
      </Card>
    </>
  );
};

export default PlanUpdate;
