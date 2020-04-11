import React, { FC, useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Login, Register, Profile, PreLoader } from './auth.module';

import { LOGIN, REGISTER, PROFILE, HOME } from 'shared/routes';
import { AuthContext } from 'shared/contexts';

import useStyles from './auth.style';

const Auth: FC = () => {
  const classes = useStyles();
  const [isDone, setIsDone] = useState<boolean>(false);
  const { isLoading, isAuthenticated } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      {isDone ? (
        <div className="auth-form">
          <Route exact path={LOGIN} component={Login} />
          <Route exact path={REGISTER} component={Register} />
          <Route exact path={PROFILE} component={Profile} />

          {isAuthenticated ? <Redirect to={HOME} /> : <Redirect to={LOGIN} />}
        </div>
      ) : (
        <PreLoader isLoading={isLoading} isAuthenticated={isAuthenticated} setIsDone={setIsDone} />
      )}
    </div>
  );
};

export default Auth;
