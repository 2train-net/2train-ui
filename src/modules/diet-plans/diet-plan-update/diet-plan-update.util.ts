import * as Yup from 'yup';

import { BASE64_REGEX, INVALID_VALUE_TEXT, REQUIRED_EXCEPTION_TEXT } from 'shared/constants';

export interface IDietUpdateFormValues {
  fileBase64: string;
}

export const DIET_UPDATE_FORM_SCHEMA = Yup.object().shape<IDietUpdateFormValues>({
  fileBase64: Yup.lazy(value =>
    /^data/.test(value as string)
      ? Yup.string()
          .trim()
          .matches(BASE64_REGEX, INVALID_VALUE_TEXT)
          .required(REQUIRED_EXCEPTION_TEXT)
      : Yup.string()
          .trim()
          .url(REQUIRED_EXCEPTION_TEXT)
          .required()
  )
});

export const INITIAL_DIET_UPDATE_VALUES: IDietUpdateFormValues = {
  fileBase64: ''
};
