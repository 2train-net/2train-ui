import _ from 'lodash';

import { WorkoutRoutineService } from 'shared/services';

import { IWorkoutExercisePayload } from 'modules/workout-routines/workout-routines.module';
import { objectDifferences } from 'shared/util';

export interface IWorkoutRoutinePayload {
  uuid?: string;
  isTemplate?: boolean;
  name?: string | null;
  isDraft: boolean;
  workoutExercises: IWorkoutExercisePayload[];
}

export const parseColumnsToData = (columns: IWorkoutExercisePayload[][], data: IWorkoutExercisePayload[]) => {
  const array = columns.reduce((items, column) => [...items, ...column], []);

  const edited: IWorkoutExercisePayload[] = [];

  let deleted = _.differenceWith(data, array, _.isEqual);
  let created = _.differenceWith(array, data, _.isEqual);

  created.forEach((creItem) => {
    deleted.forEach((delItem, indexD) => {
      if (delItem.uuid === creItem.uuid) {
        edited.push(creItem);
        deleted.splice(indexD, 1);
      }
    });
  });

  created = _.differenceWith(created, edited, _.isEqual);

  return {
    create: created,
    update: edited,
    delete: deleted,
  };
};

export const updatePositionsAndColumns = (columns: IWorkoutExercisePayload[][]) => {
  return columns.map((column, index) =>
    column.map((workoutExercise, position) => ({
      ...workoutExercise,
      day: WorkoutRoutineService.parseNumberToDay(index),
      order: position,
    }))
  );
};

export const parseDataToColumns = (data?: IWorkoutExercisePayload[]): IWorkoutExercisePayload[][] => {
  if (data) {
    const maxColumn = WorkoutRoutineService.getMaxDay(data);
    const ordered = _.orderBy(_.orderBy(data, 'order', 'asc'), 'day', 'asc');
    const grouped = insertEmptyColumns(_.groupBy(ordered, 'day'), maxColumn);
    const groupedByDay = Object.entries(grouped).sort(
      (x, y) => WorkoutRoutineService.parseStringToDayNumber(x[0]) - WorkoutRoutineService.parseStringToDayNumber(y[0])
    );
    const final = groupedByDay.reduce((acc: any, current) => {
      acc.push(current[1]);
      return acc;
    }, []);
    return Object.values(final);
  }
  return [];
};

const insertEmptyColumns = (columns: any, maxDay: number) => {
  const columnsCopy = columns;
  if (maxDay === -1) {
    return [[], [], []];
  }
  for (let i = 0; i < maxDay; i++) {
    if (!columnsCopy[WorkoutRoutineService.parseNumberToDay(i)]) {
      columnsCopy[WorkoutRoutineService.parseNumberToDay(i)] = [];
    }
  }
  return columnsCopy;
};

export const compareColumns = (initialData: IWorkoutExercisePayload[][], newData?: IWorkoutExercisePayload[][]) => {
  const flattenInitialData = _.flatten(initialData);
  const flattenNewData = _.flatten(newData);
  let ban = false;
  if (flattenInitialData.length === flattenNewData.length) {
    flattenInitialData.forEach((item, i) => {
      if (Object.keys(objectDifferences(item, flattenNewData[i])).length) {
        ban = true;
      }
    });
  } else {
    ban = true;
  }
  return ban;
};

export const findElementInColumn = (uuid: string, column: IWorkoutExercisePayload[]) => {
  return _.find(column, (workoutExercise) => workoutExercise.exercise.uuid === uuid);
};

export const dayOptions = [
  { value: 1, label: '1 Día' },
  { value: 2, label: '2 Días' },
  { value: 3, label: '3 Días' },
  { value: 4, label: '4 Días' },
  { value: 5, label: '5 Días' },
  { value: 6, label: '6 Días' },
  { value: 7, label: '7 Días' },
];

export const dropdownMenuOptions = [{ value: 1, label: 'Importar' }];
