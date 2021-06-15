import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Form, Row, Col } from 'antd';

import { INGREDIENTS_TEXT } from 'modules/meals/meals.module';

import { Button, Icon } from 'shared/modules';
import { Field, Select, Upload } from 'shared/modules/form';
import { objectDifferences } from 'shared/util/object-differences';
import { ISelectOption } from 'shared/modules/form/select/select.component';
import { DESCRIPTION_TEXT, NAME_TEXT, SAVE_TEXT } from 'shared/constants';

import { MEAL_FORM_SCHEMA, IMealFormValues, INITIAL_MEAL_VALUES } from './meal-form.util';

import useStyles from './meal-form.style';

interface IMealForm {
  onSubmit: (data: IMealFormValues) => any;
  initialValues?: IMealFormValues;
  ingredients?: ISelectOption[];
}

const { Item } = Form;

const MealForm: FC<IMealForm> = ({ onSubmit, initialValues = INITIAL_MEAL_VALUES, ingredients = [] }) => {
  const classes = useStyles();

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IMealFormValues>({
    onSubmit,
    initialValues,
    validationSchema: MEAL_FORM_SCHEMA,
    enableReinitialize: true
  });

  const haveValuesChanged = !Object.keys(objectDifferences(initialValues, values)).length;

  return (
    <Form onSubmitCapture={handleSubmit} className={classes.root}>
      <Row gutter={24}>
        <Col xs={24} md={6}>
          <Item>
            <Upload
              name="imageBase64"
              className="meal-image-uploader"
              error={errors.imageBase64}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.imageBase64}
            >
              {values.imageBase64 ? (
                <img src={values.imageBase64} alt="meal-image" />
              ) : (
                <>
                  <Icon type="plus" />
                  <p>Imagen</p>
                </>
              )}
            </Upload>
          </Item>
        </Col>
        <Col xs={24} md={12}>
          <Field
            isDisabled={false}
            name="name"
            placeholder={NAME_TEXT}
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            hasBeenTouched={touched.name}
          />

          <Field
            isDisabled={false}
            name="description"
            placeholder={DESCRIPTION_TEXT}
            value={values.description}
            error={errors.description}
            onChange={handleChange}
            hasBeenTouched={touched.description}
          />

          <Select
            isMultiple
            name="ingredients"
            options={ingredients}
            placeholder={INGREDIENTS_TEXT}
            value={values.ingredients}
            error={errors.ingredients as string}
            setFieldValue={setFieldValue}
            hasBeenTouched={touched.ingredients}
          />
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
      <Row>
        <Col style={{ width: '100%' }}>
          <Item className="submit-button">
            <Button type="submit" disabled={haveValuesChanged}>
              {SAVE_TEXT}
            </Button>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MealForm;
