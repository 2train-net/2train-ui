import React, { FC } from 'react';

import { Redirect, useLocation } from 'react-router';

import { Card } from 'antd';

import ExerciseForm from 'modules/exercises/shared/components/exercise-form/exercise-form.component';

import { IExerciseFormValues } from 'modules/exercises/shared/components/exercise-form/exercise-form.util';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { GetExerciseDocument, useUpdateExerciseMutation, useGetExerciseQuery } from 'shared/generated/graphql-schema';

import { NOT_FOUND } from 'shared/routes';

const ExerciseUpdate: FC = () => {
  const location = useLocation();

  const [uuid] = location.pathname.split('/').reverse();

  const where = { uuid };

  const [updateExercise] = useUpdateExerciseMutation();

  const { data, loading, error } = useGetExerciseQuery({
    variables: {
      where
    }
  });
  const notFound = !data?.payload && !loading;

  const onSubmit = async (data: IExerciseFormValues) => {
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

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <>
      <FormHeader title="Update Plan" />
      <br />
      <Card>
        <ExerciseForm onSubmit={onSubmit} initialValues={data?.payload} />
      </Card>
    </>
  );
};

export default ExerciseUpdate;
