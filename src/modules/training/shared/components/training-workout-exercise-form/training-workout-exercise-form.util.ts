import * as Yup from 'yup';

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
    sets: Yup.number().required('Required'),
    reps: Yup.number().required('Required'),
    weight: Yup.number().required('Required')
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
