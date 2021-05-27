import React, { FC, RefObject } from 'react';

import { Col, Row } from 'antd';

import { useFormik } from 'formik';

import { Field, RadioGroup } from 'shared/modules/form';

import {
  WorkoutExerciseFocus,
  IWorkoutExerciseFormValues,
  WORKOUT_EXERCISE_FORM_SCHEMA,
  INITIAL_WORKOUT_EXERCISE_FORM_VALUES
} from './workout-exercise-form.util';

interface IWorkoutExerciseForm {
  initialValues?: IWorkoutExerciseFormValues;
  onSubmit: (values: IWorkoutExerciseFormValues) => any;
  formRef: RefObject<HTMLFormElement>;
}

const WorkoutExerciseForm: FC<IWorkoutExerciseForm> = ({
  initialValues = INITIAL_WORKOUT_EXERCISE_FORM_VALUES,
  onSubmit,
  formRef
}) => {
  const onPreviousSubmit = (values: IWorkoutExerciseFormValues) => {
    values.focus === WorkoutExerciseFocus.REPS ? (values.seconds = null) : (values.reps = null);
    onSubmit(values);
    resetForm();
  };

  const parseInitialValues = initialValues
    ? initialValues.reps === null
      ? { ...initialValues, focus: WorkoutExerciseFocus.SPRINT }
      : { ...initialValues, focus: WorkoutExerciseFocus.REPS }
    : initialValues;

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched, resetForm } = useFormik<
    IWorkoutExerciseFormValues
  >({
    onSubmit: onPreviousSubmit,
    initialValues: parseInitialValues,
    validationSchema: WORKOUT_EXERCISE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <form onSubmitCapture={handleSubmit} ref={formRef}>
      <Row gutter={24}>
        <Col span={24}>
          <RadioGroup
            value={values.focus}
            name="focus"
            options={[
              { label: 'Reps', value: WorkoutExerciseFocus.REPS },
              { label: 'Sprint', value: WorkoutExerciseFocus.SPRINT }
            ]}
            error={errors.focus}
            setFieldValue={setFieldValue}
            hasBeenTouched={touched.focus}
          />
        </Col>
        <br />
        <br />

        <Col span={12}>
          Sets:{' '}
          <Field
            name="sets"
            type="number"
            placeholder="Sets"
            value={values.sets}
            error={errors.sets}
            onChange={handleChange}
            hasBeenTouched={touched.sets}
          />{' '}
        </Col>
        {values.focus === WorkoutExerciseFocus.REPS ? (
          <Col span={12}>
            Reps:{' '}
            <Field
              name="reps"
              type="number"
              placeholder="Reps"
              value={values.reps}
              error={errors.reps}
              onChange={handleChange}
              hasBeenTouched={touched.reps}
            />
          </Col>
        ) : (
          <Col span={12}>
            Seconds:
            <Field
              name="seconds"
              type="number"
              placeholder="Seconds"
              value={values.seconds}
              error={errors.seconds}
              onChange={handleChange}
              hasBeenTouched={touched.seconds}
            />
          </Col>
        )}
        <Col span={24}>
          <Field
            name="weight"
            type="number"
            label="Weight"
            placeholder="Weight"
            value={values.weight}
            error={errors.weight}
            onChange={handleChange}
            hasBeenTouched={touched.weight}
          />
        </Col>

        <Col span={24}>
          <Field
            name="comments"
            label="Comments"
            placeholder="Comments"
            value={values.comments}
            error={errors.comments}
            onChange={handleChange}
            hasBeenTouched={touched.comments}
          />
        </Col>
      </Row>
    </form>
  );
};

export default WorkoutExerciseForm;
