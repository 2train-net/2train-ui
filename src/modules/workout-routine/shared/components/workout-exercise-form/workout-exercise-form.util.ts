import * as Yup from 'yup';

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
    .required('Required'),

  sets: Yup.number().required('Required'),
  reps: Yup.number().when('focus', {
    is: WorkoutExerciseFocus.REPS,
    then: Yup.number().required('Required'),
    otherwise: Yup.number()
      .nullable()
      .default(null)
  }),
  seconds: Yup.number().when('focus', {
    is: WorkoutExerciseFocus.SPRINT,
    then: Yup.number().required('Required'),
    otherwise: Yup.number()
      .nullable()
      .default(null)
  }),
  weight: Yup.number().required('Required')
});

export const INITIAL_WORKOUT_EXERCISE_FORM_VALUES: IWorkoutExerciseFormValues = {
  sets: 0,
  reps: 0,
  weight: 0,
  seconds: 0,
  comments: '',
  focus: WorkoutExerciseFocus.REPS
};
