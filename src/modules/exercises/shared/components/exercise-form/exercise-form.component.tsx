import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Col, Form, Row } from 'antd';

import { EXERCISE_FORM_SCHEMA, IExerciseFormValues, INITIAL_EXERCISE_VALUES } from './exercise-form.util';

import { Button } from 'shared/modules';
import { Field } from 'shared/modules/form';
import { objectDifferences } from 'shared/util/object-differences';
import { DESCRIPTION_TEXT, NAME_TEXT, SAVE_TEXT } from 'shared/constants';

interface IExerciseForm {
  isLoading: boolean;
  initialValues?: IExerciseFormValues;
  onSubmit: (data: IExerciseFormValues) => any;
}

const ExerciseForm: FC<IExerciseForm> = ({ isLoading, initialValues = INITIAL_EXERCISE_VALUES, onSubmit }) => {
  const { handleSubmit, handleChange, values, errors, touched } = useFormik<IExerciseFormValues>({
    onSubmit,
    initialValues,
    validationSchema: EXERCISE_FORM_SCHEMA,
    enableReinitialize: true
  });

  const haveValuesChanged = !Object.keys(objectDifferences(initialValues, values)).length;

  return (
    <Form onSubmitCapture={handleSubmit}>
      <Row gutter={24}>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          <Field
            name="name"
            value={values.name}
            error={errors.name}
            placeholder={NAME_TEXT}
            isDisabled={isLoading}
            hasBeenTouched={touched.name}
            onChange={handleChange}
          />
          <Field
            name="description"
            value={values.description}
            error={errors.description}
            isDisabled={isLoading}
            placeholder={DESCRIPTION_TEXT}
            hasBeenTouched={touched.description}
            onChange={handleChange}
          />
          <Form.Item className="submit-button" style={{ textAlign: 'center' }}>
            <Button type="submit" disabled={haveValuesChanged || isLoading} loading={isLoading}>
              {SAVE_TEXT}
            </Button>
          </Form.Item>
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </Form>
  );
};

export default ExerciseForm;
