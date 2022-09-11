import React, { FC, useContext } from 'react';

import { Redirect } from 'react-router';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { ExerciseForm, IExerciseFormValues, UPDATE_EXERCISE_TITLE } from 'modules/exercises/exercises.module';

import { FormPage } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { EXERCISES, NOT_FOUND } from 'shared/routes';
import { arrayDifferences, objectDifferences } from 'shared/util';
import { useErrorHandler } from 'shared/hooks';
import { GetExerciseDocument, useUpdateExerciseMutation, useGetExerciseQuery } from 'shared/generated';

const ExerciseUpdate: FC = () => {
  const history = useHistory();
  const {
    params: { uuid },
  } = useRouteMatch<{ uuid: string }>();
  const { user } = useContext(AuthContext);

  const where = { uuid };

  const [updateExercise, updateExercisePayload] = useUpdateExerciseMutation();

  const exercisePayload = useGetExerciseQuery({
    variables: {
      where,
    },
  });

  const { error } = exercisePayload || updateExercisePayload;

  useErrorHandler(error);

  const { muscleGroups = [], ...exerciseInfo } = exercisePayload?.data?.payload! || {};
  const exercise = {
    ...exerciseInfo,
    muscleGroups: muscleGroups.map((muscleGroup) => muscleGroup),
  };

  const isDisabled = user?.uuid !== exerciseInfo?.user?.uuid;
  const notFound = !exercisePayload.data?.payload && !exercisePayload.loading;

  const redirectToExercises = () => {
    history.push(EXERCISES);
  };

  const onSubmit = async ({ muscleGroups: newMuscleGroups, ...values }: IExerciseFormValues) => {
    try {
      if (!updateExercisePayload.loading) {
        const data = objectDifferences(values, { ...exerciseInfo });
        const differences = arrayDifferences(exercise.muscleGroups, newMuscleGroups);

        await updateExercise({
          variables: {
            where,
            data: {
              ...data,
              muscleGroups: {
                create: differences.create.map((muscleGroup) => muscleGroup),
                delete: differences.delete.map((muscleGroup) => muscleGroup),
              },
            },
          },
          update: (cache, { data }) => {
            cache.writeQuery({
              data,
              query: GetExerciseDocument,
              variables: {
                where,
              },
            });
          },
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
        isDisabled={isDisabled}
        initialValues={exercisePayload.data?.payload}
        isLoading={exercisePayload.loading || updateExercisePayload.loading}
      />
    </FormPage>
  );
};

export default ExerciseUpdate;
