import React, { FC } from 'react';

import { Redirect, Switch } from 'react-router-dom';

import { BodyMeasureList, BodyMeasureCreate } from './body-measures.module';

import { PrivateRoute } from 'shared/modules/route';
import { NOT_FOUND, BODY_MEASURES, BODY_MEASURE_ADD } from 'shared/routes';

const BodyMeasure: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={BODY_MEASURE_ADD} component={BodyMeasureCreate} />
      <PrivateRoute exact path={BODY_MEASURES} component={BodyMeasureList} />

      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default BodyMeasure;
