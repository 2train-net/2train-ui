import React, { FC, useContext } from 'react';

import { Switch, Route } from 'react-router-dom';

import { ClientList, ClientDetail } from './clients.module';

import { AuthContext } from 'shared/contexts';
import { NotFoundErrorPage } from 'shared/modules';
import { PrivateRoute } from 'shared/modules/route';
import { PERMISSIONS } from 'shared/constants';
import { CLIENTS, CLIENT_DETAIL } from 'shared/routes';

const Clients: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute user={user} roles={PERMISSIONS.CLIENTS}>
      <Switch>
        <Route exact path={CLIENTS} component={ClientList} />
        <Route exact path={CLIENT_DETAIL} component={ClientDetail} />

        <Route component={NotFoundErrorPage} />
      </Switch>
    </PrivateRoute>
  );
};

export default Clients;
