import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export enum WorkoutExerciseFocus {
  SPRINT,
  REPS
}
export interface IWorkoutExerciseFormValues {
  sets: number;
  reps?: number | null;
  weight?: number | null;
  seconds?: number | null;
  comments?: string | null;
  focus: WorkoutExerciseFocus;
}

export const WORKOUT_EXERCISE_FORM_SCHEMA = Yup.object().shape({
  focus: Yup.mixed<WorkoutExerciseFocus>()
    .oneOf([WorkoutExerciseFocus.REPS, WorkoutExerciseFocus.SPRINT])
    .required(REQUIRED_EXCEPTION_TEXT),

  sets: Yup.number().required(REQUIRED_EXCEPTION_TEXT),
  reps: Yup.number().when('focus', {
    is: WorkoutExerciseFocus.REPS,
    then: Yup.number().required(REQUIRED_EXCEPTION_TEXT),
    otherwise: Yup.number()
      .nullable()
      .default(null)
  }),
  seconds: Yup.number().when('focus', {
    is: WorkoutExerciseFocus.SPRINT,
    then: Yup.number().required(REQUIRED_EXCEPTION_TEXT),
    otherwise: Yup.number()
      .nullable()
      .default(null)
  }),
  weight: Yup.number().required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_WORKOUT_EXERCISE_FORM_VALUES: IWorkoutExerciseFormValues = {
  sets: 0,
  reps: 0,
  weight: 0,
  seconds: 0,
  comments: '',
  focus: WorkoutExerciseFocus.REPS
};
