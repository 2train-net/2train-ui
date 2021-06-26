import React, { FC } from 'react';

import { ExerciseForm, IExerciseFormValues } from 'modules/exercises/exercises.module';

import { GetAllExercisesDocument, GetAllExercisesQuery, useCreateExerciseMutation } from 'shared/generated';

interface IExerciseOptionCreateValues {
  searchInput: string;
  onFinishAction: () => void;
}
const ExerciseOptionCreate: FC<IExerciseOptionCreateValues> = ({ searchInput, onFinishAction }) => {
  const [createExercise, { loading }] = useCreateExerciseMutation();

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
        onFinishAction();
      }
    } catch (error) {}
  };

  return (
    <ExerciseForm
      fullWidth
      onSubmit={onSubmit}
      initialValues={{ name: searchInput, description: '' }}
      isLoading={loading}
      enableSubmitButton
    />
  );
};

export default ExerciseOptionCreate;
