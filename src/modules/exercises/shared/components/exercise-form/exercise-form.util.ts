import * as Yup from 'yup';

import {
  REQUIRED_EXCEPTION_TEXT,
  MINIMUM_ONE_MUSCLE_GROUP_EXCEPTION_TEXT,
  TOO_LONG_EXCEPTION_TEXT,
} from 'shared/constants';

import { MuscleGroup } from 'shared/generated';

export interface IExerciseFormValues {
  name: string;
  description?: string | null;
  image?: string | null;
  video?: string | null;
  muscleGroups: Array<MuscleGroup>;
}

export const EXERCISE_FORM_SCHEMA = Yup.object().shape<IExerciseFormValues>({
  name: Yup.string().required(REQUIRED_EXCEPTION_TEXT).max(100, TOO_LONG_EXCEPTION_TEXT),
  description: Yup.string().required(REQUIRED_EXCEPTION_TEXT).max(100, TOO_LONG_EXCEPTION_TEXT),
  image: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  video: Yup.string().required(REQUIRED_EXCEPTION_TEXT).max(15, TOO_LONG_EXCEPTION_TEXT),
  muscleGroups: Yup.array<MuscleGroup>()
    .min(1, MINIMUM_ONE_MUSCLE_GROUP_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT),
});

export const INITIAL_EXERCISE_VALUES: IExerciseFormValues = {
  name: '',
  description: '',
  image: '',
  video: '',
  muscleGroups: [],
};
