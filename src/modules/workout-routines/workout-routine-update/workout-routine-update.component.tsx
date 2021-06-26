import React, { FC, useContext, useEffect } from 'react';

import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import {
  useGetWorkoutRoutineQuery,
  useGetAllExercisesQuery,
  useUpdateWorkoutRoutineMutation,
  UserType
} from 'shared/generated';

import { parseWorkoutExerciseToItem, parseUpdate, parseCreate, parseDelete } from './workout-routine-update.util';

import {
  ExerciseItemCard,
  WorkoutExerciseItemCard,
  ExerciseOptionCreate,
  WorkoutExerciseForm,
  WORKOUT_EXERCISE_MODAL,
  EXERCISE_NOT_EXISTS_TEXT,
  NOT_REPEAT_EXERCISE_EXCEPTION,
  SEARCH_EXERCISE_TEXT
} from 'modules/workout-routines/workout-routines.module';

import { AuthContext } from 'shared/contexts';
import { WorkoutRoutineService } from 'shared/services';
import { DETAIL, NOT_FOUND, PLANS } from 'shared/routes';
import { DragAndDropRoutine, Message } from 'shared/modules';
import { EXERCISES_TEXT, WORKOUT_ROUTINE_TEXT } from 'shared/constants';
import { IDragAndDropRoutineFormValues } from 'shared/modules/drag-and-drop-routine/shared/model/column-items.interface';

const WorkoutRoutineUpdate: FC = () => {
  const { getMaxDay } = WorkoutRoutineService;

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const where = { uuid };
  const redirect = history.push;
  const isEditModeEnabled = user?.type === UserType.PersonalTrainer;

  const workoutRoutine = useGetWorkoutRoutineQuery({
    fetchPolicy: 'network-only',
    variables: {
      where
    }
  });

  const exercises = useGetAllExercisesQuery();

  const notFound = !workoutRoutine.data?.payload && !workoutRoutine.loading;

  const [updateWorkoutRoutine, updateWorkoutRoutinePayload] = useUpdateWorkoutRoutineMutation();

  const onSubmit = async (data: IDragAndDropRoutineFormValues) => {
    if (workoutRoutine.loading || updateWorkoutRoutinePayload.loading) return;

    const payload = {
      workoutExercises: {
        create: parseCreate(data.create),
        update: parseUpdate(data.update),
        delete: parseDelete(data.delete)
      }
    };

    const response = await updateWorkoutRoutine({
      variables: {
        where,
        data: payload
      }
    });

    redirect(`${PLANS}/${DETAIL}/${response.data?.payload.plan.uuid}`);
  };

  useEffect(() => {
    if (workoutRoutine.error) {
      Message.error(workoutRoutine.error.graphQLErrors[0].message);
    }
  }, [workoutRoutine.error]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <DragAndDropRoutine
      optionsTitle={EXERCISES_TEXT}
      routineTitle={WORKOUT_ROUTINE_TEXT}
      searchOptionText={SEARCH_EXERCISE_TEXT}
      notRepeatOptionsText={NOT_REPEAT_EXERCISE_EXCEPTION}
      optionNotExistsText={EXERCISE_NOT_EXISTS_TEXT}
      data={parseWorkoutExerciseToItem(workoutRoutine.data?.payload.workoutExercises)}
      options={isEditModeEnabled ? exercises.data?.payload : undefined}
      renderColumnCard={WorkoutExerciseItemCard}
      renderOptionCard={ExerciseItemCard}
      renderForm={WorkoutExerciseForm}
      createOptionsRenderForm={ExerciseOptionCreate}
      formModal={WORKOUT_EXERCISE_MODAL}
      onSubmit={onSubmit}
      isEditModeEnabled={isEditModeEnabled}
      isLoading={workoutRoutine.loading || updateWorkoutRoutinePayload.loading}
      maxColumn={getMaxDay(workoutRoutine.data?.payload.workoutExercises)}
      acceptsRepeated={false}
    />
  );
};

export default WorkoutRoutineUpdate;
