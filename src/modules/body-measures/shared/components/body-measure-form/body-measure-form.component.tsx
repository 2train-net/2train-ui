import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Row, Col, Form, Card, Typography } from 'antd';

import {
  bodyPictureFields,
  HEIGHT_TEXT,
  WEIGHT_TEXT,
  IBodyMeasureFormValues,
  BODY_MEASURE_LIST_TITLE,
  BODY_MEASURE_FORM_SCHEMA,
  INITIAL_BODY_MEASURE_FORM_VALUES,
  HEIGHT_MEASURE_TEXT,
  WEIGHT_MEASURE_TEXT
} from 'modules/body-measures/body-measures.module';

import { DATA_TEXT, IMAGES_FORMATS } from 'shared/constants';
import { Field, UploadDragger } from 'shared/modules/form';
import { FormId } from 'shared/model';

const { Title } = Typography;

interface IBodyMeasureForm {
  isLoading: boolean;
  onSubmit: (values: IBodyMeasureFormValues) => any;
}

const BodyMeasureForm: FC<IBodyMeasureForm> = ({ isLoading, onSubmit }) => {
  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IBodyMeasureFormValues>({
    onSubmit,
    initialValues: INITIAL_BODY_MEASURE_FORM_VALUES,
    validationSchema: BODY_MEASURE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <Form id={FormId.BODY_MEASURE_FORM_ID} onSubmitCapture={handleSubmit}>
      <Row gutter={24} className="form-content">
        <Col xs={24} md={16}>
          <Card>
            <Title level={5}>{BODY_MEASURE_LIST_TITLE}</Title>
            <br />
            <Row gutter={24} className="body-pictures">
              {bodyPictureFields.map(({ title, name }) => (
                <Col
                  key={`col-${name}`}
                  xs={24}
                  md={12}
                  lg={6}
                  style={{ height: '100%' }}
                  className="body-picture-column"
                >
                  {
                    <UploadDragger
                      key={name}
                      name={name}
                      title={title}
                      description=""
                      error={errors[name]}
                      hasBeenTouched={touched[name]}
                      setFieldValue={setFieldValue}
                      isDisabled={isLoading}
                      format={IMAGES_FORMATS}
                    />
                  }
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Title level={5}>{DATA_TEXT}</Title>
            <br />
            <Field
              labelTop
              isRequired
              type="number"
              name="height"
              label={HEIGHT_TEXT}
              value={values.height}
              error={errors.height}
              isDisabled={isLoading}
              suffix={HEIGHT_MEASURE_TEXT}
              hasBeenTouched={touched.weight}
              onChange={handleChange}
            />
            <Field
              labelTop
              isRequired
              type="number"
              name="weight"
              label={WEIGHT_TEXT}
              value={values.weight}
              error={errors.weight}
              isDisabled={isLoading}
              suffix={WEIGHT_MEASURE_TEXT}
              hasBeenTouched={touched.weight}
              onChange={handleChange}
            />
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default BodyMeasureForm;
