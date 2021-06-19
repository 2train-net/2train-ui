import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Col, Form, Row } from 'antd';

import { IPlanFormValues, INITIAL_PLAN_FORM_VALUES, PLAN_FORM_SCHEMA, PlanFocus } from './plan-form.util';

import { Button } from 'shared/modules';
import { PlanService, CurrencyService } from 'shared/services';
import { Field, FieldGroup, Select, RadioGroup } from 'shared/modules/form';
import { Currency, IntervalPlan, PlanStatus } from 'shared/generated';
import { objectDifferences } from 'shared/util/object-differences';
import {
  BOTH_TEXT,
  CURRENCY_TEXT,
  DESCRIPTION_TEXT,
  DIET_TEXT,
  DURATION_TEXT,
  EXERCISES_TEXT,
  INTERVAL_TEXT,
  NAME_TEXT,
  PRICE_TEXT,
  SAVE_TEXT,
  STATUS_TEXT
} from 'shared/constants';

interface IPlanForm {
  isLoading: boolean;
  initialValues?: IPlanFormValues;
  onSubmit: (values: IPlanFormValues) => any;
}

const PlanForm: FC<IPlanForm> = ({ isLoading, initialValues = INITIAL_PLAN_FORM_VALUES, onSubmit }) => {
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
            placeholder={NAME_TEXT}
            value={values.name}
            error={errors.name}
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

          <FieldGroup>
            <Field
              name="price"
              type="number"
              value={values.price}
              error={errors.price}
              isDisabled={isLoading}
              placeholder={PRICE_TEXT}
              hasBeenTouched={touched.price}
              onChange={handleChange}
            />

            <Select
              value={values.currency}
              name="currency"
              options={[
                { label: CurrencyService.parseCurrencyByCount(values.price, Currency.Crc), value: Currency.Crc },
                { label: CurrencyService.parseCurrencyByCount(values.price, Currency.Us), value: Currency.Us }
              ]}
              error={errors.currency}
              isDisabled={isLoading}
              placeholder={CURRENCY_TEXT}
              hasBeenTouched={touched.currency}
              setFieldValue={setFieldValue}
            />
          </FieldGroup>

          <FieldGroup>
            <Field
              name="intervalCount"
              type="number"
              value={values.intervalCount}
              error={errors.intervalCount}
              isDisabled={isLoading}
              placeholder={DURATION_TEXT}
              hasBeenTouched={touched.intervalCount}
              onChange={handleChange}
            />

            <Select
              value={values.intervalPlan}
              name="intervalPlan"
              options={[
                {
                  label: PlanService.parseIntervalByCount(values.intervalCount, IntervalPlan.Day),
                  value: IntervalPlan.Day
                },
                {
                  label: PlanService.parseIntervalByCount(values.intervalCount, IntervalPlan.Week),
                  value: IntervalPlan.Week
                },
                {
                  label: PlanService.parseIntervalByCount(values.intervalCount, IntervalPlan.Month),
                  value: IntervalPlan.Month
                },
                {
                  label: PlanService.parseIntervalByCount(values.intervalCount, IntervalPlan.Year),
                  value: IntervalPlan.Year
                }
              ]}
              error={errors.currency}
              isDisabled={isLoading}
              placeholder={INTERVAL_TEXT}
              hasBeenTouched={touched.currency}
              setFieldValue={setFieldValue}
            />
          </FieldGroup>

          <Select
            value={values.status}
            name="status"
            options={[
              { label: PlanService.parseStatus(PlanStatus.Active), value: PlanStatus.Active },
              { label: PlanService.parseStatus(PlanStatus.Inactive), value: PlanStatus.Inactive }
            ]}
            error={errors.status}
            isDisabled={isLoading}
            placeholder={STATUS_TEXT}
            hasBeenTouched={touched.status}
            setFieldValue={setFieldValue}
          />

          <RadioGroup
            value={values.focus}
            name="focus"
            options={[
              { label: EXERCISES_TEXT, value: PlanFocus.EXERCISES },
              { label: BOTH_TEXT, value: PlanFocus.BOTH },
              { label: DIET_TEXT, value: PlanFocus.NUTRITIONAL }
            ]}
            error={errors.focus}
            isDisabled={isLoading}
            hasBeenTouched={touched.focus}
            setFieldValue={setFieldValue}
          />
          <br />
          <br />

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

export default PlanForm;
