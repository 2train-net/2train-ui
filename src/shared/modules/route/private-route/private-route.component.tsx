import React, { FC, useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router';

import { LOGIN } from 'shared/routes';
import { AuthContext } from 'shared/contexts';

interface IPrivateRoute extends RouteProps {
  component: any;
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (isAuthenticated && !user ? <Component {...props} /> : <Redirect to={LOGIN} />)}
    />
  );
};

export default PrivateRoute;
