import { IWorkoutExercisePayload } from './workout-exercise-payload.model';

export interface ITemplateRoutinePayload {
  uuid: string;
  name?: string | null;
  workoutExercises: IWorkoutExercisePayload[];
}
