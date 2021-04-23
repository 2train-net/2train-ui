import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Col, Form, Row } from 'antd';

import { IPlanFormValues, INITIAL_PLAN_FORM_VALUES, PLAN_FORM_SCHEMA } from './plan-form.util';

import Button from 'shared/modules/button/button.component';

import { Field, FieldGroup, Select } from 'shared/modules/form';
import { Currency, IntervalPlan, PlanStatus } from 'shared/generated/graphql-schema';
import { objectDifferences } from 'shared/util/object-differences';

interface IPlanForm {
  initialValues?: IPlanFormValues;
  onSubmit: (values: IPlanFormValues) => any;
}

const PlanForm: FC<IPlanForm> = ({ initialValues = INITIAL_PLAN_FORM_VALUES, onSubmit }) => {
  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IPlanFormValues>({
    onSubmit,
    initialValues,
    validationSchema: PLAN_FORM_SCHEMA,
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
            placeholder="Nombre"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            hasBeenTouched={touched.name}
          />

          <Field
            name="description"
            placeholder="Descripción"
            value={values.description}
            error={errors.description}
            onChange={handleChange}
            hasBeenTouched={touched.description}
          />

          <FieldGroup>
            <Field
              name="price"
              type="number"
              placeholder="Precio"
              value={values.price}
              error={errors.price}
              onChange={handleChange}
              hasBeenTouched={touched.price}
            />

            <Select
              value={values.currency}
              name="currency"
              placeholder="Moneda"
              options={[
                { label: 'Colones', value: Currency.Crc },
                { label: 'Dolares', value: Currency.Us }
              ]}
              error={errors.currency}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.currency}
            />
          </FieldGroup>

          <FieldGroup>
            <Field
              name="intervalCount"
              type="number"
              placeholder="Duración"
              value={values.intervalCount}
              error={errors.intervalCount}
              onChange={handleChange}
              hasBeenTouched={touched.intervalCount}
            />

            <Select
              value={values.intervalPlan}
              name="intervalPlan"
              placeholder="Intervalo"
              options={[
                { label: 'Día', value: IntervalPlan.Day },
                { label: 'Semana', value: IntervalPlan.Week },
                { label: 'Mes', value: IntervalPlan.Month },
                { label: 'Año', value: IntervalPlan.Year }
              ]}
              error={errors.currency}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.currency}
            />
          </FieldGroup>

          <Select
            value={values.status}
            name="status"
            placeholder="Estado"
            options={[
              { label: 'Activo', value: PlanStatus.Active },
              { label: 'Inactivo', value: PlanStatus.Inactive }
            ]}
            error={errors.status}
            setFieldValue={setFieldValue}
            hasBeenTouched={touched.status}
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

export default PlanForm;
