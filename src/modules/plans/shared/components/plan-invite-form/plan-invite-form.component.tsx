import React, { FC, RefObject } from 'react';

import { useFormik } from 'formik';
import { Col, Row } from 'antd';

import {
  IPlanInviteFormValues,
  INITIAL_PLAN_INVITE_FORM_VALUES,
  PLAN_INVITE_FORM_SCHEMA
} from './plan-invite-form.util';

import { Field } from 'shared/modules/form';

interface IPlanInviteForm {
  initialValues?: IPlanInviteFormValues;
  onSubmit: (values: IPlanInviteFormValues) => any;
  formRef: RefObject<HTMLFormElement>;
}

const PlanForm: FC<IPlanInviteForm> = ({ initialValues = INITIAL_PLAN_INVITE_FORM_VALUES, onSubmit, formRef }) => {
  const { handleSubmit, handleChange, values, errors, touched } = useFormik<IPlanInviteFormValues>({
    onSubmit,
    initialValues,
    validationSchema: PLAN_INVITE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <form onSubmitCapture={handleSubmit} ref={formRef}>
      <Row gutter={24}>
        <Col style={{ margin: 'auto', width: '100%' }}>
          <Field
            name="email"
            placeholder="Email"
            value={values.email}
            error={errors.email}
            onChange={handleChange}
            hasBeenTouched={touched.email}
          />
        </Col>
      </Row>
    </form>
  );
};

export default PlanForm;
