import * as Yup from 'yup';

import { NUMBER_TYPE_EXCEPTION_TEXT, REQUIRED_EXCEPTION_TEXT, NUMBER_MORE_THAN_EXCEPTION_TEXT } from 'shared/constants';
import { UnitMeasure } from 'shared/generated';

export enum WorkoutExerciseFocus {
  SPRINT,
  REPS,
}
export interface IWorkoutExerciseFormValues {
  sets: number;
  reps?: number | null;
  weight?: number | null;
  seconds?: number | null;
  comments?: string | null;
  unitMeasure?: UnitMeasure | null;
  focus: WorkoutExerciseFocus;
}

export const WORKOUT_EXERCISE_FORM_SCHEMA = Yup.object().shape({
  focus: Yup.mixed<WorkoutExerciseFocus>()
    .oneOf([WorkoutExerciseFocus.REPS, WorkoutExerciseFocus.SPRINT])
    .required(REQUIRED_EXCEPTION_TEXT),

  sets: Yup.number()
    .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT)
    .moreThan(0, NUMBER_MORE_THAN_EXCEPTION_TEXT),
  reps: Yup.number()
    .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
    .when('focus', {
      is: WorkoutExerciseFocus.REPS,
      then: Yup.number()
        .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
        .required(REQUIRED_EXCEPTION_TEXT)
        .moreThan(0, NUMBER_MORE_THAN_EXCEPTION_TEXT),
      otherwise: Yup.number().typeError(NUMBER_TYPE_EXCEPTION_TEXT).nullable().default(null),
    }),
  seconds: Yup.number()
    .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
    .when('focus', {
      is: WorkoutExerciseFocus.SPRINT,
      then: Yup.number()
        .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
        .required(REQUIRED_EXCEPTION_TEXT)
        .moreThan(0, NUMBER_MORE_THAN_EXCEPTION_TEXT),
      otherwise: Yup.number().typeError(NUMBER_TYPE_EXCEPTION_TEXT).nullable().default(null),
    }),
  weight: Yup.number().required(REQUIRED_EXCEPTION_TEXT),
});

export const INITIAL_WORKOUT_EXERCISE_FORM_VALUES: IWorkoutExerciseFormValues = {
  sets: 0,
  reps: 0,
  weight: 0,
  seconds: 0,
  comments: '',
  unitMeasure: UnitMeasure.Pound,
  focus: WorkoutExerciseFocus.REPS,
};
