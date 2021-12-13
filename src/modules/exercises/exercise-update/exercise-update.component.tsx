import React, { FC } from 'react';

import { Redirect } from 'react-router';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { ExerciseForm, IExerciseFormValues, UPDATE_EXERCISE_TITLE } from 'modules/exercises/exercises.module';

import { FormPage } from 'shared/modules';
import { EXERCISES, NOT_FOUND } from 'shared/routes';
import { objectDifferences } from 'shared/util';
import { useErrorHandler } from 'shared/hooks';
import { GetExerciseDocument, useUpdateExerciseMutation, useGetExerciseQuery } from 'shared/generated';

const ExerciseUpdate: FC = () => {
  const history = useHistory();
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const [updateExercise, updateExercisePayload] = useUpdateExerciseMutation();

  const exercisePayload = useGetExerciseQuery({
    variables: {
      where
    }
  });

  const { error } = exercisePayload || updateExercisePayload;

  useErrorHandler(error);

  const notFound = !exercisePayload.data?.payload && !exercisePayload.loading;

  const redirectToExercises = () => {
    history.push(EXERCISES);
  };

  const onSubmit = async (values: IExerciseFormValues) => {
    try {
      if (!updateExercisePayload.loading) {
        const data = objectDifferences(values, exercisePayload.data?.payload);

        await updateExercise({
          variables: {
            data,
            where
          },
          update: (cache, { data }) => {
            cache.writeQuery({
              data,
              query: GetExerciseDocument,
              variables: {
                where
              }
            });
          }
        });

        redirectToExercises();
      }
    } catch (error) {}
  };

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <FormPage title={UPDATE_EXERCISE_TITLE}>
      <ExerciseForm
        onSubmit={onSubmit}
        initialValues={exercisePayload.data?.payload}
        isLoading={exercisePayload.loading || updateExercisePayload.loading}
      />
    </FormPage>
  );
};

export default ExerciseUpdate;
