import * as Yup from 'yup';

export interface IExerciseForm {
  name: string;
  description: string;
}

export const EXERCISE_FORM_SCHEMA = Yup.object().shape<IExerciseForm>({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});

export const INITIAL_EXERCISE_VALUES: IExerciseForm = {
  name: '',
  description: ''
};
