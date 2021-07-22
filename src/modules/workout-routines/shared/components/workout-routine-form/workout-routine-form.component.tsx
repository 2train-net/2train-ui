import React, { FC, RefObject } from 'react';

import { Col, Row } from 'antd';

import { useFormik } from 'formik';

import { Field } from 'shared/modules/form';

import {
  IWorkoutRoutineFormValues,
  WORKOUT_ROUTINE_FORM_SCHEMA,
  INITIAL_WORKOUT_ROUTINE_FORM_VALUES
} from './workout-routine-form.util';
import { NAME_TITLE } from 'modules/workout-routines/workout-routines.module';

interface IWorkoutRoutineForm {
  initialValues?: IWorkoutRoutineFormValues;
  onSubmit: (values: IWorkoutRoutineFormValues) => any;
  formRef: RefObject<HTMLFormElement>;
}

const WorkoutRoutineForm: FC<IWorkoutRoutineForm> = ({
  initialValues = INITIAL_WORKOUT_ROUTINE_FORM_VALUES,
  onSubmit,
  formRef
}) => {
  const { handleSubmit, handleChange, values, errors, touched, resetForm } = useFormik<IWorkoutRoutineFormValues>({
    onSubmit,
    initialValues,
    validationSchema: WORKOUT_ROUTINE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <form onSubmitCapture={handleSubmit} ref={formRef}>
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Field
            label={NAME_TITLE}
            name="name"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            hasBeenTouched={touched.name}
          />
        </Col>
      </Row>
    </form>
  );
};

export default WorkoutRoutineForm;
