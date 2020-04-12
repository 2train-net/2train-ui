import React, { FC, useContext, useState } from 'react';
import { Redirect, useLocation, Switch } from 'react-router-dom';

import { Login, Register, Profile, PreLoader } from './auth.module';

import { LOGIN, REGISTER, COMPLETE_PROFILE } from 'shared/routes';
import { PublicRoute, PrivateRoute } from 'shared/modules/route';
import { AuthContext } from 'shared/contexts';

import useStyles from './auth.style';

const Auth: FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { isLoading, isAuthenticated } = useContext(AuthContext);

  const [isDone, setIsDone] = useState<boolean>(false);
  const [, route] = pathname.split('/');
  const COMING_ROUTE = `/${route}`;

  return (
    <div className={classes.root}>
      {isDone ? (
        <div className="auth-form">
          <Switch>
            <PublicRoute exact path={LOGIN} component={Login} />
            <PublicRoute exact path={REGISTER} component={Register} />
            <PrivateRoute exact path={COMPLETE_PROFILE} component={Profile} />
          </Switch>
          {!isLoading && !isAuthenticated && <Redirect to={COMING_ROUTE === REGISTER ? COMING_ROUTE : LOGIN} />}
        </div>
      ) : (
        <PreLoader isLoading={isLoading} isAuthenticated={isAuthenticated} setIsDone={setIsDone} />
      )}
    </div>
  );
};

export default Auth;
