import React, { FC, useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router';

import { HOME } from 'shared/routes';
import { AuthContext } from 'shared/contexts';

interface IPublicRoute extends RouteProps {
  component: any;
}

const PublicRoute: FC<IPublicRoute> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (!isAuthenticated || !user ? <Component {...props} /> : <Redirect to={HOME} />)}
    />
  );
};

export default PublicRoute;
