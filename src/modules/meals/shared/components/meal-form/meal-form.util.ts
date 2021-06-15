import * as Yup from 'yup';

import { MINIMUM_ONE_INGREDIENT_EXCEPTION_TEXT } from 'modules/meals/meals.module';

import { REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface IMealFormValues {
  name: string;
  description?: string | null;
  imageBase64?: string | null;
  ingredients: string[];
}

export const MEAL_FORM_SCHEMA = Yup.object().shape<IMealFormValues>({
  name: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  description: Yup.string()
    .notRequired()
    .nullable(),
  imageBase64: Yup.string()
    .notRequired()
    .nullable(),
  ingredients: Yup.array<string>()
    .min(1, MINIMUM_ONE_INGREDIENT_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT)
});

export const INITIAL_MEAL_VALUES: IMealFormValues = {
  name: '',
  description: undefined,
  imageBase64: undefined,
  ingredients: []
};
