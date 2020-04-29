import * as Yup from 'yup';

export interface IBodyMeasureData {
  bodyWater: number;
  proteins: number;
  minerals: number;
  bodyFat: number;
  weight: number;
  height: number;
  skeletalMuscleMass: number;
  bodyFatMass: number;
  bodyMassIndex: number;
  percentageBodyFat: number;
}

export const BODY_MEASURE_FORM_SCHEMA = Yup.object().shape<IBodyMeasureData>({
  bodyWater: Yup.number().required('Required'),
  proteins: Yup.number().required('Required'),
  minerals: Yup.number().required('Required'),
  bodyFat: Yup.number().required('Required'),
  weight: Yup.number().required('Required'),
  height: Yup.number().required('Required'),
  skeletalMuscleMass: Yup.number().required('Required'),
  bodyFatMass: Yup.number().required('Required'),
  bodyMassIndex: Yup.number().required('Required'),
  percentageBodyFat: Yup.number().required('Required')
});

export const INITIAL_BODY_MEASURE_FORM_VALUES: IBodyMeasureData = {
  bodyWater: 0,
  proteins: 0,
  minerals: 0,
  bodyFat: 0,
  weight: 0,
  height: 0,
  skeletalMuscleMass: 0,
  bodyFatMass: 0,
  bodyMassIndex: 0,
  percentageBodyFat: 0
};
