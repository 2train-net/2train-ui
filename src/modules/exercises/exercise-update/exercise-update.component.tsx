import React, { FC, useEffect } from 'react';

import { Redirect } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { Card } from 'antd';

import { ExerciseForm, IExerciseFormValues } from 'modules/exercises/exercises.module';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { Message } from 'shared/modules';
import { NOT_FOUND } from 'shared/routes';
import { GetExerciseDocument, useUpdateExerciseMutation, useGetExerciseQuery } from 'shared/generated';
import { objectDifferences } from 'shared/util';

const ExerciseUpdate: FC = () => {
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const [updateExercise] = useUpdateExerciseMutation();

  const exercisePayload = useGetExerciseQuery({
    variables: {
      where
    }
  });

  const notFound = !exercisePayload.data?.payload && !exercisePayload.loading;

  const onSubmit = async (values: IExerciseFormValues) => {
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
  };

  useEffect(() => {
    if (exercisePayload.error) {
      Message.error(exercisePayload.error.graphQLErrors[0].message);
    }
  }, [exercisePayload.error]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <>
      <FormHeader title="Update Plan" />
      <br />
      <Card>
        <ExerciseForm onSubmit={onSubmit} initialValues={exercisePayload.data?.payload} />
      </Card>
    </>
  );
};

export default ExerciseUpdate;
