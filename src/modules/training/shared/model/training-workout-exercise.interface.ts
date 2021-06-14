import { Day } from 'shared/generated';

interface IExercise {
  uuid: string;
  name: string;
}
export interface IWorkoutExercise {
  uuid: string;
  exercise: IExercise;
  sets: number;
  reps?: number | null;
  weight?: number | null;
  seconds?: number | null;
  comments?: string | null;
  order: number;
  day: Day;
}

export interface ITrainingWorkoutExercise extends IWorkoutExercise {
  completed: boolean;
}
