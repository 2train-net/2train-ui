import React, { FC } from 'react';

import { Switch, Redirect } from 'react-router-dom';

import { ClientList, ClientDetail } from './clients.module';

import { PrivateRoute } from 'shared/modules/route';
import { CLIENTS, CLIENT_DETAIL, NOT_FOUND } from 'shared/routes';

const Clients: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={CLIENTS} component={ClientList} />

      <PrivateRoute exact path={CLIENT_DETAIL} component={ClientDetail} />

      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default Clients;
