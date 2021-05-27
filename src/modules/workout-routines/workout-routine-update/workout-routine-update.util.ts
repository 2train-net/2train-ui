import { IWorkoutExercisePayload } from 'modules/workout-routines/workout-routines.module';

import { ColumnItem } from 'shared/modules/drag-and-drop-routine/column-items.interface';

import { Day } from 'shared/generated';

const parseDayToNumber = {
  [Day.Day_1]: 0,
  [Day.Day_2]: 1,
  [Day.Day_3]: 2,
  [Day.Day_4]: 3,
  [Day.Day_5]: 4,
  [Day.Day_6]: 5,
  [Day.Day_7]: 6
};

const parseNumberToDay: { [key: number]: any } = {
  0: Day.Day_1,
  1: Day.Day_2,
  2: Day.Day_3,
  3: Day.Day_4,
  4: Day.Day_5,
  5: Day.Day_6,
  6: Day.Day_7
};

export const parseWorkoutExerciseToItem = (workoutExercises: IWorkoutExercisePayload[] | undefined) => {
  return workoutExercises
    ? workoutExercises.map(workoutExercise => ({
        uuid: workoutExercise.uuid,
        option: workoutExercise.exercise,
        column: parseDayToNumber[workoutExercise.day],
        position: workoutExercise.order,
        data: workoutExercise
      }))
    : undefined;
};

export const parseItemToWorkoutExerciseCard = (item: ColumnItem) => {
  return {
    ...item.data,
    exercise: item.option,
    day: parseNumberToDay[item.column],
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
      day: parseNumberToDay[column],
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
    day: parseNumberToDay[column],
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
