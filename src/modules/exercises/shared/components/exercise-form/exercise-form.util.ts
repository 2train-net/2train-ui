import * as Yup from 'yup';

export interface IExerciseFormValues {
  name: string;
  description?: string | null;
}

export const EXERCISE_FORM_SCHEMA = Yup.object().shape<IExerciseFormValues>({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});

export const INITIAL_EXERCISE_VALUES: IExerciseFormValues = {
  name: '',
  description: ''
};
