import { IWorkoutExercisePayload } from 'modules/workout-routines/workout-routines.module';

import { WorkoutRoutineService } from 'shared/services';

const { parseNumberToDay } = WorkoutRoutineService;

export interface IWorkoutExerciseItem extends IWorkoutExercisePayload {
  focus: string;
}

export const parseUpdate = (workoutExercises: IWorkoutExerciseItem[]) => {
  return workoutExercises.map(({ focus, uuid, exercise, ...workoutExercise }) => ({
    where: {
      uuid,
    },
    data: {
      ...workoutExercise,
      exercise: {
        connect: {
          uuid: exercise.uuid,
        },
      },
    },
  }));
};

export const parseCreate = (workoutExercises: IWorkoutExerciseItem[]) => {
  return workoutExercises.map(({ focus, uuid, exercise, ...workoutExercise }) => ({
    ...workoutExercise,
    exercise: {
      connect: {
        uuid: exercise.uuid,
      },
    },
  }));
};

export const parseDelete = (workoutExercises: IWorkoutExerciseItem[]) => {
  return workoutExercises.map((workoutExercise) => ({
    uuid: workoutExercise.uuid,
  }));
};
