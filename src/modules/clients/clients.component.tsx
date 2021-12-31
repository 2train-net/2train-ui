import React, { FC } from 'react';

import { Switch, Redirect } from 'react-router-dom';

import { ClientList, ClientCreate, ClientDetail } from './clients.module';

import { PrivateRoute } from 'shared/modules/route';
import { CLIENTS, CLIENT_ADD, CLIENT_DETAIL, NOT_FOUND } from 'shared/routes';

const Clients: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={CLIENT_ADD} component={ClientCreate} />
      <PrivateRoute exact path={CLIENT_DETAIL} component={ClientDetail} />
      <PrivateRoute exact path={CLIENTS} component={ClientList} />

      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default Clients;
