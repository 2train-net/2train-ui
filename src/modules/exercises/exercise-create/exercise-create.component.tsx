import React, { FC } from 'react';

import { Card } from 'antd';

import ExerciseForm from 'modules/exercises/shared/components/exercise-form/exercise-form.component';

import { IExerciseFormValues } from 'modules/exercises/shared/components/exercise-form/exercise-form.util';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { useCreateExerciseMutation } from 'shared/generated/graphql-schema';

const ExerciseCreate: FC = () => {
  const [createExercise] = useCreateExerciseMutation();

  const onSubmit = async (data: IExerciseFormValues) => {
    await createExercise({
      variables: {
        data
      }
    });
  };

  return (
    <>
      <FormHeader title="Create Exercise" />
      <br />
      <Card>
        <ExerciseForm onSubmit={onSubmit} />
      </Card>
    </>
  );
};

export default ExerciseCreate;
