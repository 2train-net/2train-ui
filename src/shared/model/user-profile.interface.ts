import { Day, Gender, Scope, UserStatus, UserType, UserProgress } from 'shared/generated';

export interface IWorkoutExercise {
  uuid: string;
  day: Day;
  workoutId?: number | null;
  isDeleted: boolean;
}

export interface IWorkoutRoutine {
  uuid: string;
  workoutExercises: IWorkoutExercise[];
}

export interface ICurrentActivePlan {
  uuid: string;
  workoutRoutine?: IWorkoutRoutine;
  expireAt: string;
}

export type IUserProgress = Omit<UserProgress, '__typename'>;

export interface IUserProfile {
  uuid: string;
  email: string;
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday?: string;
  gender?: Gender | null;
  status: UserStatus;
  scope: Scope;
  type: UserType;
  progress: IUserProgress;
  currentActivePlan?: ICurrentActivePlan;
}
