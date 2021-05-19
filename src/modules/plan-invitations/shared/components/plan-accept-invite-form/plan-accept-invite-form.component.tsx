import React, { FC, RefObject } from 'react';

import { useFormik } from 'formik';
import { Col, Row } from 'antd';

import { IPlanAcceptInviteFormValues, PLAN_ACCEPT_INVITE_FORM_SCHEMA } from './plan-accept-invite-form.util';

import { DatePicker } from 'shared/modules/form';
import { ICurrentActivePlan } from 'shared/model';
import { DateService } from 'shared/services';

interface IPlanInviteForm {
  onSubmit: (values: IPlanAcceptInviteFormValues) => any;
  currentActivePlan?: ICurrentActivePlan;
  formRef: RefObject<HTMLFormElement>;
}

const PlanForm: FC<IPlanInviteForm> = ({ onSubmit, formRef, currentActivePlan }) => {
  const validStartDate = currentActivePlan ? new Date(currentActivePlan.expireAt) : new Date();

  const validStartDateFormatted = DateService.add(validStartDate, currentActivePlan ? 1 : 0, 'day');

  const { handleSubmit, setFieldValue, values, errors, touched } = useFormik<IPlanAcceptInviteFormValues>({
    onSubmit,
    initialValues: { startAt: validStartDateFormatted },
    validationSchema: PLAN_ACCEPT_INVITE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <form onSubmitCapture={handleSubmit} ref={formRef}>
      <Row gutter={24}>
        <Col style={{ margin: 'auto', width: '100%' }}>
          <DatePicker
            value={values.startAt}
            name="startAt"
            placeholder="Fecha de inicio"
            error={errors.startAt}
            setFieldValue={setFieldValue}
            hasBeenTouched={touched.startAt}
            disabledDate={{
              date: validStartDateFormatted,
              condition: 'isBefore'
            }}
          />
        </Col>
      </Row>
    </form>
  );
};

export default PlanForm;
