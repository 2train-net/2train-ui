import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Col, Form, Row } from 'antd';

import {
  IPlanInvitationFormValues,
  INITIAL_PLAN_INVITATION_FORM_VALUES,
  PLAN_INVITATION_FORM_SCHEMA
} from './plan-invitation-form.util';

import { Button } from 'shared/modules';
import { Field, Select } from 'shared/modules/form';
import { EMAIL_TEXT, SEND_TEXT } from 'shared/constants';
import { useGetAllPlansQuery } from 'shared/generated';
import { objectDifferences } from 'shared/util';
import { SELECT_PLAN_FOR_INVITATION_TEXT } from 'modules/plan-invitations/plan-invitations.module';

interface IPlanInvitationForm {
  initialValues?: IPlanInvitationFormValues;
  onSubmit: (values: IPlanInvitationFormValues) => any;
  isLoading: boolean;
}

const PlanInvitationForm: FC<IPlanInvitationForm> = ({
  initialValues = INITIAL_PLAN_INVITATION_FORM_VALUES,
  onSubmit,
  isLoading
}) => {
  const { data, loading } = useGetAllPlansQuery();
  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IPlanInvitationFormValues>({
    onSubmit,
    initialValues,
    validationSchema: PLAN_INVITATION_FORM_SCHEMA,
    enableReinitialize: true
  });

  const plans = data?.payload || [];
  const haveValuesChanged = !Object.keys(objectDifferences(initialValues, values)).length;

  return (
    <form onSubmitCapture={handleSubmit}>
      <Row gutter={24}>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          <Select
            name="uuid"
            value={values.uuid}
            error={errors.uuid}
            isDisabled={loading}
            placeholder={SELECT_PLAN_FOR_INVITATION_TEXT}
            hasBeenTouched={touched.uuid}
            setFieldValue={setFieldValue}
            options={plans.map(plan => ({
              label: plan.name,
              value: plan.uuid
            }))}
          />
          <Field
            name="email"
            placeholder={EMAIL_TEXT}
            value={values.email}
            error={errors.email}
            onChange={handleChange}
            hasBeenTouched={touched.email}
          />
          <br />
          <br />
          <Form.Item className="submit-button" style={{ textAlign: 'center' }}>
            <Button type="submit" disabled={haveValuesChanged || isLoading} loading={isLoading}>
              {SEND_TEXT}
            </Button>
          </Form.Item>
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </form>
  );
};

export default PlanInvitationForm;
