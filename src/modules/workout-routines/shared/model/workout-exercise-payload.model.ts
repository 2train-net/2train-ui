import { IExercisePayload } from 'modules/exercises/shared/model';
import { Day, UnitMeasure } from 'shared/generated';

export interface IWorkoutExercisePayload {
  uuid: string;
  exercise: IExercisePayload;
  sets: number;
  reps?: number | null;
  weight?: number | null;
  seconds?: number | null;
  comments?: string | null;
  unitMeasure?: UnitMeasure | null;
  order: number;
  day: Day;
}
