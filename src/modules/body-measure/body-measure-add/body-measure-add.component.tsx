import React, { FC, useState } from 'react';

import { useFormik } from 'formik';

import { BodyMeasureHeader, BodyMeasureForm, UploadBodyPictures } from 'modules/body-measure/body-measure.module';

import { RESPONSE } from 'modules/body-measure/body-measure.util';
import { BodyMeasureTabs } from 'modules/body-measure/shared/model';
import {
  IBodyMeasureData,
  INITIAL_BODY_MEASURE_FORM_VALUES,
  BODY_MEASURE_FORM_SCHEMA
} from 'modules/body-measure/shared/components/body-measure-form/body-measure-form.util';
import { IUploadBodyPicturesData } from 'modules/body-measure/shared/components/upload-body-pictures/upload-body-pictures.util';

const BodyMeasureAdd: FC = () => {
  const [tab, setTab] = useState<BodyMeasureTabs>(BodyMeasureTabs.INFORMATION);

  const onBodyMeasureSubmit = () => {};

  const onBodyPicturesSubmit = () => {};

  const {
    handleSubmit: handleBodyMeasureSubmit,
    handleChange: handleBodyMeasureChange,
    values: bodyMeasureValues,
    errors: bodyMeasureErrors,
    touched: bodyMeasureTouched
  } = useFormik<IBodyMeasureData>({
    onSubmit: onBodyMeasureSubmit,
    initialValues: INITIAL_BODY_MEASURE_FORM_VALUES,
    validationSchema: BODY_MEASURE_FORM_SCHEMA
  });

  const {
    handleSubmit: handleBodyPicturesSubmit,
    setFieldValue: setBodyPicturesValues,
    values: bodyPicturesValues
  } = useFormik<IUploadBodyPicturesData>({
    onSubmit: onBodyPicturesSubmit,
    initialValues: { images: [] }
  });

  return (
    <>
      <BodyMeasureHeader
        bodyMeasure={RESPONSE}
        tab={tab}
        setTab={setTab}
        routineDay={25}
        routineTotalDays={50}
        loading
      />
      <br />

      {tab === BodyMeasureTabs.INFORMATION && (
        <BodyMeasureForm
          isLoading={false}
          handleSubmit={handleBodyMeasureSubmit}
          handleChange={handleBodyMeasureChange}
          values={bodyMeasureValues}
          errors={bodyMeasureErrors}
          touched={bodyMeasureTouched}
        />
      )}
      {tab === BodyMeasureTabs.BODY_PICTURES && (
        <UploadBodyPictures
          isLoading={false}
          handleSubmit={handleBodyPicturesSubmit}
          setFieldValue={setBodyPicturesValues}
          values={bodyPicturesValues}
        />
      )}
    </>
  );
};

export default BodyMeasureAdd;
