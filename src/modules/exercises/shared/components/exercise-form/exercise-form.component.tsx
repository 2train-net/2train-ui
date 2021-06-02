import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Col, Form, Row } from 'antd';

import { EXERCISE_FORM_SCHEMA, IExerciseFormValues, INITIAL_EXERCISE_VALUES } from './exercise-form.util';

import { Button } from 'shared/modules';
import { Field } from 'shared/modules/form';
import { objectDifferences } from 'shared/util/object-differences';

interface IExerciseForm {
  onSubmit: (data: IExerciseFormValues) => any;
  initialValues?: IExerciseFormValues;
}

const ExerciseForm: FC<IExerciseForm> = ({ onSubmit, initialValues = INITIAL_EXERCISE_VALUES }) => {
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
            isDisabled={false}
            name="name"
            placeholder="Add Name"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            hasBeenTouched={touched.name}
          />
          <Field
            isDisabled={false}
            name="description"
            placeholder="Add Description"
            value={values.description}
            error={errors.description}
            onChange={handleChange}
            hasBeenTouched={touched.description}
          />
          <Form.Item className="submit-button" style={{ textAlign: 'center' }}>
            <Button type="submit" disabled={haveValuesChanged}>
              GUARDAR
            </Button>
          </Form.Item>
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </Form>
  );
};

export default ExerciseForm;
