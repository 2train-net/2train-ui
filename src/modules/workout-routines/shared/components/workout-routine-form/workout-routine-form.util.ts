import * as Yup from 'yup';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface IWorkoutRoutineFormValues {
  name: string;
}

export const WORKOUT_ROUTINE_FORM_SCHEMA = Yup.object().shape({
  name: Yup.string().required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_WORKOUT_ROUTINE_FORM_VALUES: IWorkoutRoutineFormValues = {
  name: ''
};
