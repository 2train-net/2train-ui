import React, { FC, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Card } from 'antd';

import { CREATE_EXERCISE_TITLE } from 'modules/exercises/exercises.module';

import ExerciseForm from 'modules/exercises/shared/components/exercise-form/exercise-form.component';

import { IExerciseFormValues } from 'modules/exercises/shared/components/exercise-form/exercise-form.util';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { useCreateExerciseMutation } from 'shared/generated/graphql-schema';
import { EXERCISES } from 'shared/routes';
import { Message } from 'shared/modules';

const ExerciseCreate: FC = () => {
  const history = useHistory();

  const [createExercise, { loading, error }] = useCreateExerciseMutation();

  const redirectToExercises = () => {
    history.push(EXERCISES);
  };

  const onSubmit = async (data: IExerciseFormValues) => {
    try {
      if (!loading) {
        await createExercise({
          variables: {
            data
          }
        });

        redirectToExercises();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  return (
    <>
      <FormHeader title={CREATE_EXERCISE_TITLE} />
      <br />
      <Card>
        <ExerciseForm onSubmit={onSubmit} isLoading={loading} />
      </Card>
    </>
  );
};

export default ExerciseCreate;
