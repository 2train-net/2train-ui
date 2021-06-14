import { IWorkoutExercisePayload } from 'modules/workout-routine/workout-routine.module';

import { ColumnItem } from 'shared/modules/drag-and-drop-routine/column-items.interface';

import { WorkoutRoutineService } from 'shared/services';

const { parseDayToNumber, parseNumberToDay } = WorkoutRoutineService;

export const parseWorkoutExerciseToItem = (workoutExercises: IWorkoutExercisePayload[] | undefined) => {
  return workoutExercises
    ? workoutExercises.map(workoutExercise => ({
        uuid: workoutExercise.uuid,
        option: workoutExercise.exercise,
        column: parseDayToNumber(workoutExercise.day),
        position: workoutExercise.order,
        data: workoutExercise
      }))
    : undefined;
};

export const parseItemToWorkoutExerciseCard = (item: ColumnItem) => {
  return {
    ...item.data,
    exercise: item.option,
    day: parseNumberToDay(item.column),
    order: item.position,
    uuid: item.uuid
  };
};

export const parseUpdate = (items: ColumnItem[]) => {
  return items.map(({ position, column, data: { day, order, exercise, focus, uuid, ...data } }) => ({
    where: {
      uuid
    },
    data: {
      ...data,
      order: position,
      day: parseNumberToDay(column),
      exercise: {
        connect: {
          uuid: exercise.uuid
        }
      }
    }
  }));
};

export const parseCreate = (items: ColumnItem[]) => {
  return items.map(({ position, column, option, data: { focus, ...data } }) => ({
    ...data,
    order: position,
    day: parseNumberToDay(column),
    exercise: {
      connect: {
        uuid: option.uuid
      }
    }
  }));
};

export const parseDelete = (items: ColumnItem[]) => {
  return items.map(item => ({
    uuid: item.uuid
  }));
};
