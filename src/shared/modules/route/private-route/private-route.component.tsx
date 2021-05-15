import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { NOT_FOUND } from 'shared/routes';
import { UserType } from 'shared/generated';
import { IUserProfile } from 'shared/model';

type Role = 'PERSONAL_TRAINER' | 'CUSTOMER';

interface IPrivateRoute {
  user?: IUserProfile;
  roles: Role[];
}

const ROLE_BY_USER_TYPE = {
  PERSONAL_TRAINER: UserType.PersonalTrainer,
  CUSTOMER: UserType.Customer
};

const PrivateRoute: FC<IPrivateRoute> = ({ user, roles, children }) => {
  return user && roles.find(role => ROLE_BY_USER_TYPE[role] === user.type) ? (
    <>{children}</>
  ) : (
    <Redirect to={NOT_FOUND} />
  );
};

export default PrivateRoute;
