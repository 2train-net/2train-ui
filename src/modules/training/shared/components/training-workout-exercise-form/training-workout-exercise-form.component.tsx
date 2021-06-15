import React, { FC, RefObject, useState } from 'react';

import { useFormik } from 'formik';

import { Col, Row, Button as AButton } from 'antd';

import { Field, RadioGroup, TextAreaField } from 'shared/modules/form';

import {
  TrainingWorkoutExerciseFocus,
  ITrainingWorkoutExerciseFormValues,
  TRAINING_WORKOUT_EXERCISE_FORM_SCHEMA,
  INITIAL_TRAINING_WORKOUT_EXERCISE_FORM_VALUES
} from './training-workout-exercise-form.util';
import { Icon } from 'shared/modules';

import useStyles from './training-workout-exercise-form.style';

import { SETS_TITLE, REPS_TITLE, WEIGHT_TITLE, COMMENTS_TITLE } from 'modules/workout-routine/workout-routine.module';

interface ITrainingWorkoutExerciseForm {
  initialValues?: ITrainingWorkoutExerciseFormValues;
  onComplete: (data: ITrainingWorkoutExerciseFormValues) => void;
  formRef: RefObject<HTMLFormElement>;
}

const TrainingWorkoutExerciseForm: FC<ITrainingWorkoutExerciseForm> = ({
  initialValues = INITIAL_TRAINING_WORKOUT_EXERCISE_FORM_VALUES,
  onComplete,
  formRef
}) => {
  const classes = useStyles();

  const onSum = () => {
    if (values.focus === TrainingWorkoutExerciseFocus.REPS && values.workoutExercise.reps)
      setFieldValue('workoutExercise.reps', values.workoutExercise.reps + 1);
    else if (values.focus === TrainingWorkoutExerciseFocus.SETS && values.workoutExercise.sets)
      setFieldValue('workoutExercise.sets', values.workoutExercise.sets + 1);
    else if (values.focus === TrainingWorkoutExerciseFocus.WEIGHT && values.workoutExercise.weight)
      setFieldValue('workoutExercise.weight', values.workoutExercise.weight + 1);
  };

  const onSubtract = () => {
    if (values.focus === TrainingWorkoutExerciseFocus.REPS && values.workoutExercise.reps)
      setFieldValue('workoutExercise.reps', values.workoutExercise.reps - 1);
    else if (values.focus === TrainingWorkoutExerciseFocus.SETS && values.workoutExercise.sets)
      setFieldValue('workoutExercise.sets', values.workoutExercise.sets - 1);
    else if (values.focus === TrainingWorkoutExerciseFocus.WEIGHT && values.workoutExercise.weight)
      setFieldValue('workoutExercise.weight', values.workoutExercise.weight - 1);
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched, resetForm } = useFormik<
    ITrainingWorkoutExerciseFormValues
  >({
    onSubmit: () => {
      onComplete(values);
      resetForm();
    },
    initialValues: initialValues,
    validationSchema: TRAINING_WORKOUT_EXERCISE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <form onSubmitCapture={handleSubmit} ref={formRef} className={classes.root}>
      <Row>
        <Col span={24}>
          <RadioGroup
            value={values.focus}
            name="focus"
            options={
              initialValues.workoutExercise.reps
                ? [
                    { label: SETS_TITLE, value: TrainingWorkoutExerciseFocus.SETS },
                    { label: REPS_TITLE, value: TrainingWorkoutExerciseFocus.REPS },
                    { label: WEIGHT_TITLE, value: TrainingWorkoutExerciseFocus.WEIGHT }
                  ]
                : [
                    { label: SETS_TITLE, value: TrainingWorkoutExerciseFocus.SETS },
                    { label: REPS_TITLE, value: TrainingWorkoutExerciseFocus.WEIGHT }
                  ]
            }
            hasBeenTouched={touched.focus}
            setFieldValue={setFieldValue}
          />
        </Col>

        <Col className="circle-container" span={24}>
          <AButton style={{ marginRight: 10, top: '35%' }} shape="circle" onClick={onSubtract}>
            <Icon type="minus" />
          </AButton>
          {values.focus === TrainingWorkoutExerciseFocus.SETS ? (
            <Field
              name="sets"
              type="number"
              value={values.workoutExercise.sets}
              error={errors.workoutExercise?.sets}
              onChange={handleChange('workoutExercise.sets')}
              hasBeenTouched={touched.workoutExercise?.sets}
            />
          ) : (
            ''
          )}
          {values.focus === TrainingWorkoutExerciseFocus.REPS ? (
            <Field
              name="reps"
              type="number"
              value={values.workoutExercise.reps}
              error={errors.workoutExercise?.reps}
              onChange={handleChange('workoutExercise.reps')}
              hasBeenTouched={touched.workoutExercise?.reps}
            />
          ) : (
            ''
          )}
          {values.focus === TrainingWorkoutExerciseFocus.WEIGHT ? (
            <>
              <Field
                name="weight"
                measure="lbs"
                type="number"
                value={values.workoutExercise.weight}
                error={errors.workoutExercise?.weight}
                onChange={handleChange('workoutExercise.weight')}
                hasBeenTouched={touched.workoutExercise?.weight}
              />
            </>
          ) : (
            ''
          )}

          <AButton shape="circle" style={{ marginLeft: 10, top: '35%' }} onClick={onSum}>
            <Icon type="plus" />
          </AButton>
        </Col>

        <Col span={24}>
          <TextAreaField
            label={COMMENTS_TITLE}
            labelTop={true}
            name="comments"
            value={values.workoutExercise.comments}
            error={errors.workoutExercise?.comments}
            onChange={handleChange('workoutExercise.comments')}
            hasBeenTouched={touched.workoutExercise?.comments}
          />
        </Col>
      </Row>
    </form>
  );
};

export default TrainingWorkoutExerciseForm;
