import React, { FC, RefObject } from 'react';

import { Col, Row } from 'antd';

import { useFormik } from 'formik';

import { Field, RadioGroup, TextAreaField } from 'shared/modules/form';

import {
  WorkoutExerciseFocus,
  IWorkoutExerciseFormValues,
  WORKOUT_EXERCISE_FORM_SCHEMA,
  INITIAL_WORKOUT_EXERCISE_FORM_VALUES
} from './workout-exercise-form.util';
import {
  COMMENTS_TITLE,
  REPS_TITLE,
  SECONDS_TITLE,
  SETS_TITLE,
  WEIGHT_TITLE
} from 'modules/workout-routine/workout-routine.module';

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
          <Field
            label={SETS_TITLE}
            labelTop={true}
            name="sets"
            type="number"
            placeholder={SETS_TITLE}
            value={values.sets}
            error={errors.sets}
            onChange={handleChange}
            hasBeenTouched={touched.sets}
          />{' '}
        </Col>
        {values.focus === WorkoutExerciseFocus.REPS ? (
          <Col span={12}>
            <Field
              label={REPS_TITLE}
              labelTop={true}
              name="reps"
              type="number"
              placeholder={REPS_TITLE}
              value={values.reps}
              error={errors.reps}
              onChange={handleChange}
              hasBeenTouched={touched.reps}
            />
          </Col>
        ) : (
          <Col span={12}>
            <Field
              label={SECONDS_TITLE}
              labelTop={true}
              name="seconds"
              type="number"
              placeholder={SECONDS_TITLE}
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
            label={WEIGHT_TITLE}
            placeholder={WEIGHT_TITLE}
            value={values.weight}
            error={errors.weight}
            onChange={handleChange}
            hasBeenTouched={touched.weight}
            labelTop={true}
            suffix="lbs"
          />
        </Col>

        <Col span={24}>
          <TextAreaField
            name="comments"
            label={COMMENTS_TITLE}
            placeholder={COMMENTS_TITLE}
            value={values.comments}
            error={errors.comments}
            onChange={handleChange}
            hasBeenTouched={touched.comments}
            labelTop={true}
          />
        </Col>
      </Row>
    </form>
  );
};

export default WorkoutExerciseForm;
