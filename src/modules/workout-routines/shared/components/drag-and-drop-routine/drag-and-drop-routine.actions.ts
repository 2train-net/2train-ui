import _ from 'lodash';

import { IExercisePayload } from 'modules/exercises/exercises.module';

import { DraggableLocation } from 'react-beautiful-dnd';

import { WorkoutRoutineService } from 'shared/services';

import { v4 as uuid } from 'uuid';

import { IWorkoutExercisePayload } from '../../model';
import { IWorkoutExerciseFormValues } from '../workout-exercise-form/workout-exercise-form.util';

export const reorder = (list: IWorkoutExercisePayload[], startIndex: number, endIndex: number) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const copy = (
  source: IExercisePayload[],
  destination: IWorkoutExercisePayload[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
  formData: IWorkoutExerciseFormValues
) => {
  const sourceClone = source;
  const destClone = destination;
  const option = sourceClone[droppableSource.index];

  const data: IWorkoutExercisePayload = {
    uuid: uuid(),
    exercise: option,
    day: WorkoutRoutineService.parseNumberToDay(parseInt(droppableDestination.droppableId)),
    order: droppableDestination.index,
    ...formData,
  };
  destClone.splice(droppableDestination.index, 0, data);

  return destClone;
};

export const move = (
  source: IWorkoutExercisePayload[],
  destination: IWorkoutExercisePayload[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
  columns: IWorkoutExercisePayload[][]
) => {
  const sourceClone = source;
  const destClone = destination;

  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  columns[parseInt(droppableSource.droppableId)] = sourceClone;
  columns[parseInt(droppableDestination.droppableId)] = destClone;

  return columns;
};
