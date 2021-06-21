import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Form, Row, Col } from 'antd';

import { INGREDIENTS_TEXT } from 'modules/meals/meals.module';

import { Button, Icon } from 'shared/modules';
import { Field, Select, Upload } from 'shared/modules/form';
import { objectDifferences } from 'shared/util/object-differences';
import { ISelectOption } from 'shared/modules/form/select/select.component';
import { DESCRIPTION_TEXT, IMAGE_TEXT, NAME_TEXT, SAVE_TEXT } from 'shared/constants';

import { MEAL_FORM_SCHEMA, IMealFormValues, INITIAL_MEAL_VALUES } from './meal-form.util';

import useStyles from './meal-form.style';

interface IMealForm {
  isLoading: boolean;
  initialValues?: IMealFormValues;
  ingredients?: ISelectOption[];
  onSubmit: (data: IMealFormValues) => any;
}

const { Item } = Form;

const MealForm: FC<IMealForm> = ({ isLoading, initialValues = INITIAL_MEAL_VALUES, ingredients = [], onSubmit }) => {
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
              isDisabled={isLoading}
              hasBeenTouched={touched.imageBase64}
            >
              {values.imageBase64 ? (
                <img src={values.imageBase64} alt="meal-image" />
              ) : (
                <>
                  <Icon type="plus" />
                  <p>{IMAGE_TEXT}</p>
                </>
              )}
            </Upload>
          </Item>
        </Col>
        <Col xs={24} md={12}>
          <Field
            name="name"
            value={values.name}
            error={errors.name}
            isDisabled={isLoading}
            placeholder={NAME_TEXT}
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

          <Select
            isMultiple
            name="ingredients"
            options={ingredients}
            value={values.ingredients}
            error={errors.ingredients as string}
            isDisabled={isLoading}
            placeholder={INGREDIENTS_TEXT}
            hasBeenTouched={touched.ingredients}
            setFieldValue={setFieldValue}
          />
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
      <Row>
        <Col style={{ width: '100%' }}>
          <Item className="submit-button">
            <Button type="submit" disabled={haveValuesChanged} loading={isLoading}>
              {SAVE_TEXT}
            </Button>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MealForm;
