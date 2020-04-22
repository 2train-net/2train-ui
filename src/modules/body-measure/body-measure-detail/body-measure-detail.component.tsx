import React, { FC, useState } from 'react';

import {
  BodyMeasureHeader,
  BodyMeasureDetailInformation,
  BodyPictures
} from 'modules/body-measure/body-measure.module';

import { RESPONSE } from 'modules/body-measure/body-measure.util';
import { BodyMeasureTabs } from 'modules/body-measure/shared/model';

const BodyMeasureDetail: FC = () => {
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

      {tab === BodyMeasureTabs.INFORMATION && (
        <BodyMeasureDetailInformation
          bodyComposition={RESPONSE.bodyComposition}
          bodyObjective={RESPONSE.bodyComposition}
          muscleFat={RESPONSE.muscleFat}
          obesity={RESPONSE.obesity}
          bodyObjectivePercentage={80}
        />
      )}
      {tab === BodyMeasureTabs.BODY_PICTURES && <BodyPictures bodyPictures={RESPONSE.bodyPictures} />}
    </>
  );
};

export default BodyMeasureDetail;
