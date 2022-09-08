import React, { FC, useContext, useState } from 'react';
import { Redirect, useLocation, Switch } from 'react-router-dom';

import { Login, Register, ForgotPassword, PreLoader, ResetPassword, ConfirmAccount } from './auth.module';

import { LOGIN, REGISTER, FORGOT_PASSWORD, RESET_PASSWORD, CONFIRM_ACCOUNT, DOWNLOAD_APP } from 'shared/routes';
import { PublicRoute } from 'shared/modules/route';
import { AuthContext } from 'shared/contexts';

import useStyles from './auth.style';
import DownloadApp from 'modules/download-app/download-app.module';

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
            <PublicRoute exact path={FORGOT_PASSWORD} component={ForgotPassword} />
            <PublicRoute exact path={RESET_PASSWORD} component={ResetPassword} />
            <PublicRoute exact path={CONFIRM_ACCOUNT} component={ConfirmAccount} />
            <PublicRoute exact path={DOWNLOAD_APP} component={DownloadApp} />
          </Switch>
          {!isLoading && !isAuthenticated && (
            <Redirect
              to={
                COMING_ROUTE === REGISTER ||
                COMING_ROUTE === FORGOT_PASSWORD ||
                COMING_ROUTE === RESET_PASSWORD ||
                COMING_ROUTE === CONFIRM_ACCOUNT ||
                COMING_ROUTE === DOWNLOAD_APP
                  ? COMING_ROUTE
                  : LOGIN
              }
            />
          )}
        </div>
      ) : (
        <PreLoader isLoading={isLoading} isAuthenticated={isAuthenticated} setIsDone={setIsDone} />
      )}
    </div>
  );
};

export default Auth;
