import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Col, Form, Row } from 'antd';

import { MUSCLE_GROUPS_TEXT, IMAGE_TEXT, VIDEO_TEXT } from 'modules/exercises/exercises.module';

import { EXERCISE_FORM_SCHEMA, IExerciseFormValues, INITIAL_EXERCISE_VALUES } from './exercise-form.util';

import { Button } from 'shared/modules';
import { ExerciseService } from 'shared/services';
import { Field, TextAreaField, Select } from 'shared/modules/form';
import { MuscleGroup } from 'shared/generated';
import { objectDifferences } from 'shared/util/object-differences';
import { DESCRIPTION_TEXT, NAME_TEXT, SAVE_TEXT } from 'shared/constants';

interface IExerciseForm {
  fullWidth?: boolean;
  isLoading: boolean;
  initialValues?: IExerciseFormValues;
  enableSubmitButton?: boolean;
  onSubmit: (data: IExerciseFormValues) => any;
}

const ExerciseForm: FC<IExerciseForm> = ({
  fullWidth = false,
  isLoading,
  initialValues = INITIAL_EXERCISE_VALUES,
  onSubmit,
  enableSubmitButton = false,
}) => {
  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IExerciseFormValues>({
    onSubmit,
    initialValues,
    validationSchema: EXERCISE_FORM_SCHEMA,
    enableReinitialize: true,
  });

  const muscleGroups = [...Object.values(MuscleGroup)];

  const haveValuesChanged = !Object.keys(objectDifferences(initialValues, values)).length;

  return (
    <Form onSubmitCapture={handleSubmit}>
      <Row gutter={24}>
        <Col xs={24} md={fullWidth ? 0 : 6}></Col>

        <Col xs={24} md={fullWidth ? 24 : 12}>
          <Field
            name="name"
            value={values.name}
            error={errors.name}
            placeholder={NAME_TEXT}
            isDisabled={isLoading}
            hasBeenTouched={touched.name}
            onChange={handleChange}
          />

          <TextAreaField
            name="description"
            value={values.description}
            error={errors.description}
            isDisabled={isLoading}
            placeholder={DESCRIPTION_TEXT}
            hasBeenTouched={touched.description}
            onChange={handleChange}
          />

          <Field
            name="image"
            value={values.image}
            error={errors.image}
            placeholder={IMAGE_TEXT}
            isDisabled={isLoading}
            hasBeenTouched={touched.image}
            onChange={handleChange}
          />

          <Field
            name="video"
            value={values.video}
            error={errors.video}
            placeholder={VIDEO_TEXT}
            isDisabled={isLoading}
            hasBeenTouched={touched.video}
            onChange={handleChange}
          />

          <Select
            isMultiple
            name="muscleGroups"
            options={muscleGroups.map((muscleGroup) => ({
              label: ExerciseService.parseMuscleGroup(muscleGroup),
              value: muscleGroup,
            }))}
            value={values.muscleGroups}
            error={errors.muscleGroups as string}
            isDisabled={isLoading}
            placeholder={MUSCLE_GROUPS_TEXT}
            hasBeenTouched={touched.muscleGroups}
            setFieldValue={setFieldValue}
          />

          <Form.Item className="submit-button" style={{ textAlign: 'center' }}>
            <Button
              type="submit"
              disabled={(haveValuesChanged || isLoading) && !enableSubmitButton}
              loading={isLoading}
            >
              {SAVE_TEXT}
            </Button>
          </Form.Item>
        </Col>
        <Col xs={24} md={fullWidth ? 0 : 6}></Col>
      </Row>
    </Form>
  );
};

export default ExerciseForm;
