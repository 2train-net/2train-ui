import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { CREATE_EXERCISE_TITLE } from 'modules/exercises/exercises.module';

import ExerciseForm from 'modules/exercises/shared/components/exercise-form/exercise-form.component';

import { IExerciseFormValues } from 'modules/exercises/shared/components/exercise-form/exercise-form.util';

import { EXERCISES } from 'shared/routes';
import { FormPage } from 'shared/modules';
import { useErrorHandler } from 'shared/hooks';
import {
  GetAllExercisesDocument,
  GetAllExercisesQuery,
  useCreateExerciseMutation
} from 'shared/generated/graphql-schema';

const ExerciseCreate: FC = () => {
  const history = useHistory();

  const [createExercise, { loading, error }] = useCreateExerciseMutation();

  useErrorHandler(error);

  const redirectToExercises = () => {
    history.push(EXERCISES);
  };

  const onSubmit = async (data: IExerciseFormValues) => {
    try {
      if (!loading) {
        await createExercise({
          variables: {
            data
          },
          update: (cache, { data }) => {
            const query = cache.readQuery<GetAllExercisesQuery>({ query: GetAllExercisesDocument });
            const exercises = query?.payload!;
            cache.writeQuery({
              data: { payload: [data?.payload, ...exercises] },
              query: GetAllExercisesDocument
            });
          }
        });

        redirectToExercises();
      }
    } catch (error) {}
  };

  return (
    <FormPage title={CREATE_EXERCISE_TITLE}>
      <ExerciseForm onSubmit={onSubmit} isLoading={loading} />
    </FormPage>
  );
};

export default ExerciseCreate;
