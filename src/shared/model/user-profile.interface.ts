import { Day, Gender, Scope, UserStatus, UserType } from 'shared/generated';

export interface IWorkoutExercise {
  uuid: string;
  workoutId?: number | null;
  day: Day;
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
  currentActivePlan?: ICurrentActivePlan;
}
