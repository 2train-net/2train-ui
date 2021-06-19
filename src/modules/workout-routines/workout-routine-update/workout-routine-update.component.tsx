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
  WorkoutExerciseForm,
  WORKOUT_EXERCISE_MODAL
} from 'modules/workout-routines/workout-routines.module';

import { AuthContext } from 'shared/contexts';
import { DragAndDropRoutine, Message } from 'shared/modules';
import { IDragAndDropRoutineFormValues } from 'shared/modules/drag-and-drop-routine/column-items.interface';
import { DETAIL, NOT_FOUND, PLANS } from 'shared/routes';
import { WorkoutRoutineService } from 'shared/services';

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
      data={parseWorkoutExerciseToItem(workoutRoutine.data?.payload.workoutExercises)}
      options={exercises.data?.payload}
      renderColumnCard={WorkoutExerciseItemCard}
      renderOptionCard={ExerciseItemCard}
      renderForm={WorkoutExerciseForm}
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
