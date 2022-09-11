import { MuscleGroup } from 'shared/generated';

export interface IExercisePayload {
  uuid: string;
  name: string;
  description?: string | null;
  image?: string | null;
  muscleGroups: Array<MuscleGroup>;
  user: {
    uuid: string;
  };
}
