import React, { ComponentType, FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { NOT_FOUND, PERMISSIONS } from 'shared/routes';
import { UserType } from 'shared/generated';
import { AuthContext } from 'shared/contexts';

interface IPrivateRoute {
  path: string;
  exact?: boolean;
  component?: ComponentType<any>;
}

const ROLE_BY_USER_TYPE = {
  PERSONAL_TRAINER: UserType.PersonalTrainer,
  CUSTOMER: UserType.Customer
};

const PrivateRoute: FC<IPrivateRoute> = ({ children, component, path, exact }) => {
  const { user } = useContext(AuthContext);

  const isValid = user && PERMISSIONS[path].find(role => ROLE_BY_USER_TYPE[role] === user.type);
  const isRouteComponent = component && path;

  return isValid ? (
    <>{isRouteComponent ? <Route exact={exact} path={path} component={component} /> : children}</>
  ) : (
    <Redirect to={NOT_FOUND} />
  );
};

export default PrivateRoute;
