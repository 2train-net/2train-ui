import React, { FC } from 'react';

import { Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useRouteMatch } from 'react-router-dom';

import { UPDATE_DIET_PLAN_TITLE } from 'modules/diet-plans/diet-plans.module';

import { SAVE_TEXT } from 'shared/constants';
import { Button, FormPage } from 'shared/modules';
import { UploadDragger } from 'shared/modules/form';
import { GetDietPlanDocument, useGetDietPlanQuery, useUpdateDietPlanMutation } from 'shared/generated';

import { IDietUpdateFormValues, DIET_UPDATE_FORM_SCHEMA, INITIAL_DIET_UPDATE_VALUES } from './diet-plan-update.util';

import useStyles from './diet-plan-update.style';

const DietPlanUpdate: FC = () => {
  const classes = useStyles();

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const [updateDietPlan, updateDietPlanPayload] = useUpdateDietPlanMutation();

  const dietPlanPayload = useGetDietPlanQuery({
    variables: {
      where
    }
  });

  const onSubmit = async ({ fileBase64 }: IDietUpdateFormValues) => {
    try {
      if (!updateDietPlanPayload.loading) {
        await updateDietPlan({
          variables: {
            where,
            data: { fileBase64 }
          },
          update: (cache, { data }) => {
            cache.writeQuery({
              data,
              query: GetDietPlanDocument,
              variables: {
                where
              }
            });
          }
        });

        resetForm();
      }
    } catch (error) {}
  };

  const { handleSubmit, setFieldValue, resetForm, values, errors, touched } = useFormik<IDietUpdateFormValues>({
    onSubmit,
    initialValues: INITIAL_DIET_UPDATE_VALUES,
    validationSchema: DIET_UPDATE_FORM_SCHEMA,
    enableReinitialize: true
  });

  const isDocumentUploaded = !!values.fileBase64.length;
  const dietPlanFile = dietPlanPayload.data?.payload.file;

  return (
    <FormPage
      title={UPDATE_DIET_PLAN_TITLE}
      isCardContentEnable={false}
      className={classes.root}
      actions={[
        <Button
          key="submit"
          size="small"
          color="primary"
          children={SAVE_TEXT}
          onClick={handleSubmit}
          disabled={!isDocumentUploaded}
          loading={updateDietPlanPayload.loading}
        />
      ]}
    >
      <Row gutter={24} className="form-content">
        <Col xs={24} md={12}>
          {dietPlanFile && <iframe src={dietPlanFile} />}
        </Col>
        <Col xs={24} md={12}>
          <UploadDragger
            name="fileBase64"
            error={errors.fileBase64}
            setFieldValue={setFieldValue}
            hasBeenTouched={touched.fileBase64}
            isDisabled={updateDietPlanPayload.loading}
          />
        </Col>
      </Row>
    </FormPage>
  );
};

export default DietPlanUpdate;
