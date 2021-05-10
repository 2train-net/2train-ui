import React, { FC } from 'react';

import { Switch, Route } from 'react-router-dom';

import { ClientList, ClientDetail } from './clients.module';

import { NotFoundErrorPage } from 'shared/modules';
import { CLIENTS, CLIENT_DETAIL } from 'shared/routes';

const Clients: FC = () => (
  <Switch>
    <Route exact path={CLIENTS} component={ClientList} />
    <Route exact path={CLIENT_DETAIL} component={ClientDetail} />

    <Route component={NotFoundErrorPage} />
  </Switch>
);

export default Clients;
