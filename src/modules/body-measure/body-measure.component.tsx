import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { BodyMeasureAdd, BodyMeasureDetail } from './body-measure.module';

import { NotFoundErrorPage } from 'shared/modules';
import { BODY_MEASURES, BODY_MEASURE_DETAIL, BODY_MEASURE_ADD } from 'shared/routes';

const BodyMeasure: FC = () => {
  return (
    <Switch>
      <Route exact path={BODY_MEASURES} component={() => <Redirect to={BODY_MEASURE_ADD} />} />
      <Route exact path={BODY_MEASURE_ADD} component={BodyMeasureAdd} />
      <Route exact path={BODY_MEASURE_DETAIL} component={BodyMeasureDetail} />

      <Route component={NotFoundErrorPage} />
    </Switch>
  );
};

export default BodyMeasure;
