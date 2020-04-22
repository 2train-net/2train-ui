import React, { FC, useState } from 'react';

import { BodyMeasureHeader } from 'modules/body-measure/body-measure.module';

import { RESPONSE } from 'modules/body-measure/body-measure.util';
import { BodyMeasureTabs } from 'modules/body-measure/shared/model';

const BodyMeasureAdd: FC = () => {
  const [tab, setTab] = useState<BodyMeasureTabs>(BodyMeasureTabs.INFORMATION);

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

      {tab === BodyMeasureTabs.INFORMATION && 'Form'}
      {tab === BodyMeasureTabs.BODY_PICTURES && 'Images'}
    </>
  );
};

export default BodyMeasureAdd;
