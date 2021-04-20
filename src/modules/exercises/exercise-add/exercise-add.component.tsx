import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { EXERCISES } from 'shared/routes';

import { ExerciseForm } from 'modules/exercises/exercises.module';
import {
  IExerciseForm,
  INITIAL_EXERCISE_VALUES
} from 'modules/exercises/shared/components/exercise-form/exercise-form.util';

import { useCreateExerciseMutation } from 'shared/generated/graphql-schema';

const ExerciseAdd: FC = () => {
  const history = useHistory();

  const [createExercise] = useCreateExerciseMutation();

  const onSubmit = async (data: IExerciseForm) => {
    await createExercise({ variables: { data } });

    history.push(EXERCISES);
  };

  return <ExerciseForm onSubmit={onSubmit} initialValues={INITIAL_EXERCISE_VALUES} />;
};

export default ExerciseAdd;
