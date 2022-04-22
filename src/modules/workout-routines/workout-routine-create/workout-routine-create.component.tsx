import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { useGetAllExercisesQuery, useCreateWorkoutRoutineMutation, UserType } from 'shared/generated';

import {
  DragAndDropRoutine,
  parseCreate,
  parseDelete,
  parseUpdate,
} from 'modules/workout-routines/workout-routines.module';

import { AuthContext } from 'shared/contexts';
import { WORKOUT_ROUTINES } from 'shared/routes';

const WorkoutRoutineCreate: FC = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const redirect = history.push;
  const isEditModeEnabled = user?.type === UserType.PersonalTrainer;

  const exercises = useGetAllExercisesQuery();

  const [createWorkoutRoutine, createWorkoutRoutinePayload] = useCreateWorkoutRoutineMutation();

  const onSubmit = async (data: any, routine?: { name: string }) => {
    if (createWorkoutRoutinePayload.loading) return;
    if (!routine) return;

    const payload = {
      name: routine.name,
      workoutExercises: {
        create: parseCreate(data.create),
        update: parseUpdate(data.update),
        delete: parseDelete(data.delete),
      },
    };
    await createWorkoutRoutine({
      variables: {
        data: payload,
      },
    });

    redirect(`${WORKOUT_ROUTINES}`);
  };

  return (
    <DragAndDropRoutine
      workoutRoutine={{ name: '', isDraft: false, workoutExercises: [] }}
      options={exercises.data?.payload}
      onSubmit={onSubmit}
      isLoading={createWorkoutRoutinePayload.loading}
      isCreateRoutineForm={true}
    />
  );
};

export default WorkoutRoutineCreate;
