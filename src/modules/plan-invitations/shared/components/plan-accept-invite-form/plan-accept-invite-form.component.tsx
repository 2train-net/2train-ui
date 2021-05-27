import React, { FC, RefObject } from 'react';

import { useFormik } from 'formik';
import { Col, Row, Typography } from 'antd';

import { IPlanAcceptInviteFormValues, PLAN_ACCEPT_INVITE_FORM_SCHEMA } from './plan-accept-invite-form.util';

import { DatePicker } from 'shared/modules/form';
import { ICurrentActivePlan } from 'shared/model';
import { DateService } from 'shared/services';
import { Currency, IntervalPlan } from 'shared/generated';

import useStyles from './plan-accept-invite-form.style';
import { DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT } from 'shared/constants';

interface IPlanInviteForm {
  onSubmit: (values: IPlanAcceptInviteFormValues) => any;
  planInvitation: {
    name: string;
    price: number;
    currency: Currency;
    intervalCount: number;
    intervalPlan: IntervalPlan;
  };
  currentActivePlan?: ICurrentActivePlan;
  formRef: RefObject<HTMLFormElement>;
}

const { Title, Text } = Typography;

const PlanForm: FC<IPlanInviteForm> = ({ onSubmit, formRef, planInvitation, currentActivePlan }) => {
  const classes = useStyles();

  const { price, currency, intervalPlan, intervalCount } = planInvitation;

  const validStartDate = currentActivePlan
    ? DateService.format(currentActivePlan?.expireAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)
    : DateService.format(new Date());

  // TODO FIX THE DATETIME ISSUE BASED ON THE TIME ZONE, FOR NOW WE WILL INCREASE DAY IN 2
  const validStartDateFormatted = DateService.add(validStartDate, currentActivePlan ? 2 : 0, 'days');

  const { handleSubmit, setFieldValue, values, errors, touched } = useFormik<IPlanAcceptInviteFormValues>({
    onSubmit,
    initialValues: { startAt: validStartDateFormatted },
    validationSchema: PLAN_ACCEPT_INVITE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <form onSubmitCapture={handleSubmit} ref={formRef} className={classes.root}>
      <Title level={3} type="success">{`${currency} ${price}`}</Title>
      <Row gutter={24}>
        <Col className="start-date-col">
          <Title level={5}>Fecha de inicio</Title>
          <DatePicker
            hasFeedback
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
            feedback={`Expira el: ${DateService.add(
              DateService.format(values.startAt),
              intervalCount,
              DateService.parseDuration(intervalPlan)
            )}`}
          />
        </Col>
      </Row>
      {currentActivePlan && (
        <div className="expiration-message">
          <Title level={5}>Ya tienes un plan activo</Title>
          <Text type="danger" strong>
            El cuál expira el:{' '}
            {DateService.format(currentActivePlan.expireAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)}
          </Text>
        </div>
      )}
    </form>
  );
};

export default PlanForm;
