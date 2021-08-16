import React, { FC, RefObject } from 'react';

import { useFormik } from 'formik';
import { Col, Row, Typography } from 'antd';

import {
  ALREADY_HAVE_AN_ACTIVE_PLAN_TEXT,
  EXPIRE_AT_TEXT,
  START_DATE_TEXT,
  WHICH_EXPIRE_AT_TEXT
} from 'modules/plan-invitations/plan-invitations.module';

import { DatePicker } from 'shared/modules/form';
import { ICurrentActivePlan } from 'shared/model';
import { DateService } from 'shared/services';
import { Currency, IntervalPlan } from 'shared/generated';
import { DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT } from 'shared/constants';

import useStyles from './plan-purchase-form.style';

import { IPlanPurchaseFormValues, PLAN_PURCHASE_FORM_SCHEMA } from './plan-purchase-form.util';

interface IPlanPurchaseForm {
  onSubmit: (values: IPlanPurchaseFormValues) => any;
  plan: {
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

const PlanForm: FC<IPlanPurchaseForm> = ({ onSubmit, formRef, plan, currentActivePlan }) => {
  const classes = useStyles();

  const { price, currency, intervalPlan, intervalCount } = plan;

  const validStartDate = currentActivePlan
    ? DateService.format(currentActivePlan?.expireAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)
    : DateService.format(new Date());

  // TODO FIX THE DATETIME ISSUE BASED ON THE TIME ZONE, FOR NOW WE WILL INCREASE DAY IN 2
  const validStartDateFormatted = DateService.add(validStartDate, currentActivePlan ? 2 : 0, 'days');

  const { handleSubmit, setFieldValue, values, errors, touched } = useFormik<IPlanPurchaseFormValues>({
    onSubmit,
    initialValues: { startAt: validStartDateFormatted },
    validationSchema: PLAN_PURCHASE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <form onSubmitCapture={handleSubmit} ref={formRef} className={classes.root}>
      <Title level={3} type="success">{`${currency} ${price}`}</Title>
      <Row gutter={24}>
        <Col className="start-date-col">
          <Title level={5}>{START_DATE_TEXT}</Title>
          <DatePicker
            hasFeedback
            value={values.startAt}
            name="startAt"
            placeholder={START_DATE_TEXT}
            error={errors.startAt}
            setFieldValue={setFieldValue}
            hasBeenTouched={touched.startAt}
            disabledDate={{
              date: validStartDateFormatted,
              condition: 'isBefore'
            }}
            feedback={`${EXPIRE_AT_TEXT}: ${DateService.add(
              DateService.format(values.startAt),
              intervalCount,
              DateService.parseDuration(intervalPlan)
            )}`}
          />
        </Col>
      </Row>
      {currentActivePlan && (
        <div className="expiration-message">
          <Title level={5}>{ALREADY_HAVE_AN_ACTIVE_PLAN_TEXT}</Title>
          <Text type="danger" strong>
            {`${WHICH_EXPIRE_AT_TEXT}: `}
            {DateService.format(currentActivePlan.expireAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)}
          </Text>
        </div>
      )}
    </form>
  );
};

export default PlanForm;
