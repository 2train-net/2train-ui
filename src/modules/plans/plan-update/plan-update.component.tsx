import React, { FC, useEffect } from 'react';

import { Redirect } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { Card } from 'antd';

import { PlanForm, IPlanFormValues, parseFlagsToPlanFocus, parsePlanFocusToFlags } from 'modules/plans/plans.module';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { Message } from 'shared/modules';
import { NOT_FOUND } from 'shared/routes';
import { GetPlanDocument, useGetPlanQuery, useUpdatePlanMutation } from 'shared/generated';

const PlanUpdate: FC = () => {
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const { data, loading, error } = useGetPlanQuery({
    variables: {
      where
    }
  });

  const notFound = !data?.payload && !loading;

  const { isExercisesPlanEnabled, isDietPlanEnabled } = data?.payload || {};

  const initialValues =
    data?.payload && typeof isExercisesPlanEnabled === 'boolean' && typeof isDietPlanEnabled === 'boolean'
      ? {
          ...data.payload,
          focus: parseFlagsToPlanFocus(isExercisesPlanEnabled, isDietPlanEnabled)
        }
      : undefined;

  const [updatePlan] = useUpdatePlanMutation();

  const onSubmit = async ({ focus, ...data }: IPlanFormValues) => {
    // TODO Add the objectDifferences method to only update what really changed
    await updatePlan({
      variables: {
        where,
        data: {
          ...data,
          ...parsePlanFocusToFlags[focus]
        }
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

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <>
      <FormHeader title="Update Plan" />
      <br />
      <Card>
        <PlanForm onSubmit={onSubmit} initialValues={initialValues} />
      </Card>
    </>
  );
};

export default PlanUpdate;
