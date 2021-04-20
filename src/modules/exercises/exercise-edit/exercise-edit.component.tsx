import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ExerciseForm } from 'modules/exercises/exercises.module';
import { IExerciseForm } from 'modules/exercises/shared/components/exercise-form/exercise-form.util';

import { EXERCISES } from 'shared/routes';
import { useUpdateExerciseMutation, useGetExerciseQuery } from 'shared/generated/graphql-schema';

interface Params {
  uuid: string;
}

const ExerciseEdit: FC = () => {
  const params = useParams<Params>();

  const history = useHistory();

  const [updateExerciseMutation] = useUpdateExerciseMutation();

  const { data, loading, error } = useGetExerciseQuery({
    fetchPolicy: 'cache-and-network',

    variables: {
      where: { uuid: params.uuid }
    }
  });

  const onSubmit = async (data: IExerciseForm) => {
    await updateExerciseMutation({
      variables: { where: { uuid: params.uuid }, data: data }
    });

    history.push(EXERCISES);
  };

  return (
    <ExerciseForm
      onSubmit={onSubmit}
      initialValues={{ name: data?.exercise.name!, description: data?.exercise.description! }}
    />
  );
};

export default ExerciseEdit;
