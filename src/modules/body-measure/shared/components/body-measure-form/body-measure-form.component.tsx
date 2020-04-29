import React, { FC } from 'react';

import { FormikErrors, FormikTouched } from 'formik';

import { Row, Col, Form, Card, Button } from 'antd';

import { Field } from 'shared/modules/form';
import { IBodyMeasureData } from './body-measure-form.util';

interface IBodyMeasureForm {
  isLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void;
  values: IBodyMeasureData;
  errors: FormikErrors<IBodyMeasureData>;
  touched: FormikTouched<IBodyMeasureData>;
}

const BodyMeasureForm: FC<IBodyMeasureForm> = ({ isLoading, handleSubmit, handleChange, values, errors, touched }) => (
  <Form onSubmitCapture={handleSubmit} layout="vertical">
    <Card title="InBody Information" bordered>
      <Row gutter={24}>
        <Col></Col>
        <Col>
          <Field
            name="bodyWater"
            type="number"
            placeholder="Body Water"
            value={values.bodyWater}
            error={errors.bodyWater}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.bodyWater}
          />
          <Field
            name="proteins"
            type="number"
            placeholder="Proteins"
            value={values.proteins}
            error={errors.proteins}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.proteins}
          />
          <Field
            name="minerals"
            type="number"
            placeholder="Minerals"
            value={values.minerals}
            error={errors.minerals}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.minerals}
          />
          <Field
            name="bodyFat"
            type="number"
            placeholder="Body Fat"
            value={values.bodyFat}
            error={errors.bodyFat}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.bodyFat}
          />
          <Field
            name="weight"
            type="number"
            placeholder="Weight"
            value={values.weight}
            error={errors.weight}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.weight}
          />
          <Field
            name="height"
            type="number"
            placeholder="Height"
            value={values.height}
            error={errors.height}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.height}
          />
          <Field
            name="skeletalMuscleMass"
            type="number"
            placeholder="Skeletal Muscle Mass"
            value={values.skeletalMuscleMass}
            error={errors.skeletalMuscleMass}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.skeletalMuscleMass}
          />
          <Field
            name="bodyFatMass"
            type="number"
            placeholder="Body Fat Mass"
            value={values.bodyFatMass}
            error={errors.bodyFatMass}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.bodyFatMass}
          />
          <Field
            name="bodyMassIndex"
            type="number"
            placeholder="Body Mass Index"
            value={values.bodyMassIndex}
            error={errors.bodyMassIndex}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.bodyMassIndex}
          />
          <Field
            name="percentageBodyFat"
            type="number"
            placeholder="Percentage Body Fat"
            value={values.percentageBodyFat}
            error={errors.percentageBodyFat}
            isDisabled={isLoading}
            onChange={handleChange}
            hasBeenTouched={touched.percentageBodyFat}
          />
        </Col>
        <Col></Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Card>
  </Form>
);

export default BodyMeasureForm;
