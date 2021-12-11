import * as Yup from 'yup';

import {
  FRONT_BODY_IMAGE_TEXT,
  BACK_BODY_IMAGE_TEXT,
  RIGHT_SIDE_IMAGE_TEXT,
  LEFT_SIDE_IMAGE_TEXT
} from 'modules/body-measures/body-measures.module';

import { REQUIRED_EXCEPTION_TEXT, NUMBER_TYPE_EXCEPTION_TEXT, INVALID_VALUE_TEXT } from 'shared/constants';

export interface IBodyMeasureFormValues {
  frontSideBodyBase64: string;
  backSideBodyBase64: string;
  rightSideBodyBase64: string;
  leftSideBodyBase64: string;
  height: number;
  weight: number;
}

export const bodyPictureFields: { title: string; name: keyof IBodyMeasureFormValues }[] = [
  { title: FRONT_BODY_IMAGE_TEXT, name: 'frontSideBodyBase64' },
  { title: BACK_BODY_IMAGE_TEXT, name: 'backSideBodyBase64' },
  { title: RIGHT_SIDE_IMAGE_TEXT, name: 'rightSideBodyBase64' },
  { title: LEFT_SIDE_IMAGE_TEXT, name: 'leftSideBodyBase64' }
];

export const BODY_MEASURE_FORM_SCHEMA = Yup.object().shape<IBodyMeasureFormValues>({
  frontSideBodyBase64: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  backSideBodyBase64: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  rightSideBodyBase64: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  leftSideBodyBase64: Yup.string().required(REQUIRED_EXCEPTION_TEXT),
  height: Yup.number()
    .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT)
    .moreThan(0, INVALID_VALUE_TEXT),
  weight: Yup.number()
    .typeError(NUMBER_TYPE_EXCEPTION_TEXT)
    .required(REQUIRED_EXCEPTION_TEXT)
    .moreThan(0, INVALID_VALUE_TEXT)
});

export const INITIAL_BODY_MEASURE_FORM_VALUES: IBodyMeasureFormValues = {
  frontSideBodyBase64: '',
  backSideBodyBase64: '',
  rightSideBodyBase64: '',
  leftSideBodyBase64: '',
  height: 0,
  weight: 0
};
