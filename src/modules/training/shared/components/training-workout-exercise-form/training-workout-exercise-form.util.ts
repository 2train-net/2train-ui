import * as Yup from 'yup';
import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export enum TrainingWorkoutExerciseFocus {
  SETS,
  REPS,
  WEIGHT
}

export interface ITrainingWorkoutExerciseFormValues {
  workoutExercise: {
    sets: number;
    reps?: number | null;
    weight?: number | null;
    comments?: string | null;
  };
  focus: TrainingWorkoutExerciseFocus;
}

export const TRAINING_WORKOUT_EXERCISE_FORM_SCHEMA = Yup.object().shape({
  workoutExercise: Yup.object().shape({
    sets: Yup.number().required(REQUIRED_EXCEPTION_TEXT),
    reps: Yup.number().required(REQUIRED_EXCEPTION_TEXT),
    weight: Yup.number().required(REQUIRED_EXCEPTION_TEXT)
  }),
  focus: Yup.number().required('Required')
});

export const INITIAL_TRAINING_WORKOUT_EXERCISE_FORM_VALUES: ITrainingWorkoutExerciseFormValues = {
  workoutExercise: {
    sets: 0,
    reps: 0,
    weight: 0,
    comments: ''
  },
  focus: TrainingWorkoutExerciseFocus.WEIGHT
};
