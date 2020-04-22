import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { BodyMeasureAdd, BodyMeasureDetail } from './body-measure.module';

import { BODY_MEASURES, BODY_MEASURE, BODY_MEASURE_ADD } from 'shared/routes';
import { NotFoundErrorPage } from 'shared/modules/error-page/error-page.module';

const BodyMeasure = () => (
  <Switch>
    <Route exact path={BODY_MEASURES} component={() => <Redirect to={BODY_MEASURE_ADD} />} />
    <Route exact path={BODY_MEASURE_ADD} component={BodyMeasureAdd} />
    <Route exact path={BODY_MEASURE} component={BodyMeasureDetail} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default BodyMeasure;
