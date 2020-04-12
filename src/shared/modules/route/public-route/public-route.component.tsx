import React, { FC, useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router';

import { AuthContext } from 'shared/contexts';

interface IPublicRoute extends RouteProps {
  component: any;
}

const PublicRoute: FC<IPublicRoute> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return <Route {...rest} render={props => (!isAuthenticated ? <Component {...props} /> : <Redirect to="/home" />)} />;
};

export default PublicRoute;
