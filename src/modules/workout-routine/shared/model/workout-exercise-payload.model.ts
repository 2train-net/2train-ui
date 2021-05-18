import { IExercisePayload } from 'modules/exercises/shared/model';
import { Day } from 'shared/generated';

export interface IWorkoutExercisePayload {
  uuid: string;
  exercise: IExercisePayload;
  sets: number;
  reps?: number | null;
  weight?: number | null;
  seconds?: number | null;
  comments?: string | null;
  order: number;
  day: Day;
}
