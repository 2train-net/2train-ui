import React, { FC, useEffect, useState, useCallback } from 'react';

import { useFormik } from 'formik';
import { debounce } from 'lodash';
import { Col, Form, Row } from 'antd';

import {
  IPlanInvitationFormValues,
  INITIAL_PLAN_INVITATION_FORM_VALUES,
  PLAN_INVITATION_FORM_SCHEMA,
  InvitationType,
} from './plan-invitation-form.util';

import { Button } from 'shared/modules';
import { Field, Select, DatePicker } from 'shared/modules/form';
import { EMAIL_TEXT, FIRST_NAME_TEXT, LAST_NAME_TEXT, PAID_PLAN_TEXT, SEND_TEXT } from 'shared/constants';
import { objectDifferences } from 'shared/util';
import { DateService } from 'shared/services';

import {
  SELECT_PLAN_FOR_INVITATION_TEXT,
  SELECT_INVITATION_TYPE,
  START_DATE_TEXT,
  EXPIRE_AT_TEXT,
} from 'modules/plan-invitations/plan-invitations.module';

import { useGetAllPlansQuery, usePublicUserLazyQuery, PublicUserStatusFilter } from 'shared/generated';

interface IPlanInvitationForm {
  initialValues?: IPlanInvitationFormValues;
  onSubmit: (values: IPlanInvitationFormValues) => any;
  isLoading: boolean;
}

const DEBOUNCE_TIMEOUT = 2000;

const PlanInvitationForm: FC<IPlanInvitationForm> = ({
  initialValues = INITIAL_PLAN_INVITATION_FORM_VALUES,
  onSubmit,
  isLoading,
}) => {
  const { data, loading } = useGetAllPlansQuery();
  const { values, errors, touched, handleSubmit, handleChange, setFieldValue, setFieldTouched } =
    useFormik<IPlanInvitationFormValues>({
      onSubmit,
      initialValues,
      validationSchema: PLAN_INVITATION_FORM_SCHEMA,
      enableReinitialize: true,
    });

  const validStartDate = DateService.format(new Date());
  const validStartDateFormatted = DateService.add(validStartDate, 0, 'days');

  const [getUserByEmail, emailValidationPayload] = usePublicUserLazyQuery({ fetchPolicy: 'network-only' });

  const plans = data?.payload || [];
  const plansActive = plans.filter((plan) => plan.status === 'ACTIVE');

  const plan = plansActive.find((plan) => plan.uuid === values.uuid);

  const haveValuesChanged = !Object.keys(objectDifferences(initialValues, values)).length;

  const checkEmailExists = useCallback(
    debounce(async (email: string) => {
      if (email.length) {
        await getUserByEmail({ variables: { where: { email, status: PublicUserStatusFilter.All } } });
      }
    }, DEBOUNCE_TIMEOUT),
    []
  );

  useEffect(() => {
    checkEmailExists.cancel();
    checkEmailExists(values.email);
  }, [values.email]);

  useEffect(() => {
    const emailPayload = emailValidationPayload.data?.payload;
    setFieldValue('isNewUser', !emailPayload);

    if (emailValidationPayload.called) setFieldTouched('email', true);
  }, [emailValidationPayload]);

  return (
    <form onSubmitCapture={handleSubmit}>
      <Row gutter={24}>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          <Select
            name="uuid"
            value={values.uuid ? values.uuid : undefined}
            error={errors.uuid}
            isDisabled={loading}
            placeholder={SELECT_PLAN_FOR_INVITATION_TEXT}
            hasBeenTouched={touched.uuid}
            setFieldValue={setFieldValue}
            options={plansActive.map((plan) => ({
              label: plan.name,
              value: plan.uuid,
            }))}
          />
          <Select
            name="invitationType"
            value={values.invitationType ? values.invitationType : undefined}
            error={errors.invitationType}
            isDisabled={loading}
            placeholder={SELECT_INVITATION_TYPE}
            hasBeenTouched={touched.invitationType}
            defaultValue={PAID_PLAN_TEXT}
            setFieldValue={setFieldValue}
            options={[{ label: PAID_PLAN_TEXT, value: InvitationType.PAID_PLAN }]}
          />
          <Field
            name="email"
            placeholder={EMAIL_TEXT}
            value={values.email}
            error={errors.email}
            onChange={handleChange}
            hasBeenTouched={touched.email}
          />
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
              condition: 'isBefore',
            }}
            feedback={
              values.startAt && plan
                ? `${EXPIRE_AT_TEXT}: ${DateService.add(
                    DateService.format(values.startAt),
                    plan.intervalCount,
                    DateService.parseDuration(plan.intervalPlan)
                  )}`
                : undefined
            }
          />
          {values.isNewUser && touched.email && (
            <>
              <Field
                name="firstName"
                placeholder={FIRST_NAME_TEXT}
                value={values.firstName}
                error={errors.firstName}
                onChange={handleChange}
                hasBeenTouched={touched.firstName}
                isDisabled={emailValidationPayload.loading}
              />
              <Field
                name="lastName"
                placeholder={LAST_NAME_TEXT}
                value={values.lastName}
                error={errors.lastName}
                onChange={handleChange}
                hasBeenTouched={touched.lastName}
                isDisabled={emailValidationPayload.loading}
              />
            </>
          )}
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
