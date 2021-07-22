import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useRouteMatch } from 'react-router-dom';

import { useGetAllExercisesQuery, useCreateWorkoutRoutineMutation, UserType } from 'shared/generated';

import {
  ExerciseItemCard,
  WorkoutExerciseItemCard,
  ExerciseOptionCreate,
  WorkoutExerciseForm,
  WORKOUT_EXERCISE_MODAL,
  EXERCISE_NOT_EXISTS_TEXT,
  NOT_REPEAT_EXERCISE_EXCEPTION,
  SEARCH_EXERCISE_TEXT,
  WorkoutRoutineForm,
  parseUpdate,
  parseCreate,
  parseDelete
} from 'modules/workout-routines/workout-routines.module';

import { AuthContext } from 'shared/contexts';
import { WORKOUT_ROUTINES } from 'shared/routes';
import { DragAndDropRoutine } from 'shared/modules';
import { EXERCISES_TEXT, WORKOUT_ROUTINE_TEXT } from 'shared/constants';
import { IDragAndDropRoutineFormValues } from 'shared/modules/drag-and-drop-routine/shared/model/column-items.interface';

const WorkoutRoutineCreate: FC = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const redirect = history.push;
  const isEditModeEnabled = user?.type === UserType.PersonalTrainer;

  const exercises = useGetAllExercisesQuery();

  const [createWorkoutRoutine, createWorkoutRoutinePayload] = useCreateWorkoutRoutineMutation();

  const onSubmit = async (data: IDragAndDropRoutineFormValues, routine: any) => {
    if (createWorkoutRoutinePayload.loading) return;
    if (!routine) return;

    const payload = {
      name: routine.name,
      workoutExercises: {
        create: parseCreate(data.create),
        update: parseUpdate(data.update),
        delete: parseDelete(data.delete)
      }
    };
    await createWorkoutRoutine({
      variables: {
        data: payload
      }
    });

    redirect(`${WORKOUT_ROUTINES}`);
  };

  return (
    <DragAndDropRoutine
      optionsTitle={EXERCISES_TEXT}
      routineTitle={WORKOUT_ROUTINE_TEXT}
      searchOptionText={SEARCH_EXERCISE_TEXT}
      notRepeatOptionsText={NOT_REPEAT_EXERCISE_EXCEPTION}
      optionNotExistsText={EXERCISE_NOT_EXISTS_TEXT}
      data={[]}
      options={isEditModeEnabled ? exercises.data?.payload : undefined}
      renderColumnCard={WorkoutExerciseItemCard}
      renderOptionCard={ExerciseItemCard}
      renderForm={WorkoutExerciseForm}
      createOptionsRenderForm={ExerciseOptionCreate}
      formModal={WORKOUT_EXERCISE_MODAL}
      onSubmit={onSubmit}
      isEditModeEnabled={isEditModeEnabled}
      isLoading={createWorkoutRoutinePayload.loading || exercises.loading}
      acceptsRepeated={false}
      renderCreateForm={WorkoutRoutineForm}
    />
  );
};

export default WorkoutRoutineCreate;
