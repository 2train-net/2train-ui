import React, { FC, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { BodyMeasureAdd, BodyMeasureDetail } from './body-measure.module';

import { AuthContext } from 'shared/contexts';
import { NotFoundErrorPage } from 'shared/modules';
import { PrivateRoute } from 'shared/modules/route';
import { PERMISSIONS } from 'shared/constants';
import { BODY_MEASURES, BODY_MEASURE_DETAIL, BODY_MEASURE_ADD } from 'shared/routes';

const BodyMeasure: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute user={user} roles={PERMISSIONS.BODY_MEASURES}>
      <Switch>
        <Route exact path={BODY_MEASURES} component={() => <Redirect to={BODY_MEASURE_ADD} />} />
        <Route exact path={BODY_MEASURE_ADD} component={BodyMeasureAdd} />
        <Route exact path={BODY_MEASURE_DETAIL} component={BodyMeasureDetail} />

        <Route component={NotFoundErrorPage} />
      </Switch>
    </PrivateRoute>
  );
};

export default BodyMeasure;
