import React, { FC } from 'react';

import { Redirect } from 'react-router';
import { useHistory, useRouteMatch } from 'react-router-dom';

import {
  PlanForm,
  IPlanFormValues,
  parseFlagsToPlanFocus,
  parsePlanFocusToFlags,
  UPDATE_PLAN_TITLE,
} from 'modules/plans/plans.module';

import { FormPage } from 'shared/modules';
import { useErrorHandler } from 'shared/hooks';
import { NOT_FOUND, PLANS } from 'shared/routes';
import {
  GetAllPlansDocument,
  GetAllPlansQuery,
  GetPlanDocument,
  useGetPlanQuery,
  useUpdatePlanMutation,
} from 'shared/generated';

const PlanUpdate: FC = () => {
  const history = useHistory();
  const {
    params: { uuid },
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const planPayload = useGetPlanQuery({
    variables: {
      where,
    },
  });

  const notFound = !planPayload.data?.payload && !planPayload.loading;

  const { isExercisesPlanEnabled, isDietPlanEnabled } = planPayload.data?.payload || {};

  const initialValues =
    planPayload.data?.payload && typeof isExercisesPlanEnabled === 'boolean' && typeof isDietPlanEnabled === 'boolean'
      ? {
          ...planPayload.data.payload,
          focus: parseFlagsToPlanFocus(isExercisesPlanEnabled, isDietPlanEnabled),
        }
      : undefined;

  const [updatePlan, updatePlanPayload] = useUpdatePlanMutation();

  const { error } = planPayload || updatePlanPayload;

  useErrorHandler(error);

  const redirectToPlans = () => {
    history.push(PLANS);
  };

  const onSubmit = async ({ focus, ...data }: IPlanFormValues) => {
    // TODO Add the objectDifferences method to only update what really changed
    try {
      if (!updatePlanPayload.loading) {
        await updatePlan({
          variables: {
            where,
            data: {
              ...data,
              ...parsePlanFocusToFlags[focus],
            },
          },
          update: (cache, { data }) => {
            cache.writeQuery({
              data,
              query: GetPlanDocument,
              variables: {
                where,
              },
            });

            const query = cache.readQuery<GetAllPlansQuery>({
              query: GetAllPlansDocument,
            });

            const payload = query?.payload.map((plan) => (plan.uuid === data?.payload.uuid ? data.payload : plan));

            cache.writeQuery({
              query: GetAllPlansDocument,
              data: {
                payload,
              },
            });
          },
        });

        redirectToPlans();
      }
    } catch (error) {}
  };

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <FormPage title={UPDATE_PLAN_TITLE}>
      <PlanForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        isLoading={planPayload.loading || updatePlanPayload.loading}
      />
    </FormPage>
  );
};

export default PlanUpdate;
