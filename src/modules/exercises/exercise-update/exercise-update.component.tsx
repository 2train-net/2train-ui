import React, { FC, useEffect } from 'react';

import { Redirect } from 'react-router';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Card } from 'antd';

import { ExerciseForm, IExerciseFormValues, UPDATE_EXERCISE_TITLE } from 'modules/exercises/exercises.module';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { Message } from 'shared/modules';
import { EXERCISES, NOT_FOUND } from 'shared/routes';
import { GetExerciseDocument, useUpdateExerciseMutation, useGetExerciseQuery } from 'shared/generated';
import { objectDifferences } from 'shared/util';

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

  useEffect(() => {
    const { error } = exercisePayload || updateExercisePayload;

    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [exercisePayload.error, updateExercisePayload.error]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <>
      <FormHeader title={UPDATE_EXERCISE_TITLE} />
      <br />
      <Card>
        <ExerciseForm
          onSubmit={onSubmit}
          initialValues={exercisePayload.data?.payload}
          isLoading={exercisePayload.loading || updateExercisePayload.loading}
        />
      </Card>
    </>
  );
};

export default ExerciseUpdate;
