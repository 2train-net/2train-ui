import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface IExerciseFormValues {
  name: string;
  description?: string | null;
}

export const EXERCISE_FORM_SCHEMA = Yup.object().shape<IExerciseFormValues>({
  name: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  description: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_EXERCISE_VALUES: IExerciseFormValues = {
  name: '',
  description: ''
};
