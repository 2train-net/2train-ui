import { Day } from 'shared/generated';

export interface ICreateWorkoutExercise {
  exercise: {
    connect: {
      uuid: string;
    };
  };
  sets: number;
  reps?: number | null;
  weight?: number | null;
  seconds?: number | null;
  comments?: string | null;
  order: number;
  day: Day;
}
