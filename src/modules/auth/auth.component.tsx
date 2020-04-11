import React, { FC, useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { LOGIN, REGISTER, PROFILE, HOME } from 'shared/routes';
import { Login, Register, Profile, PreLoader } from './auth.module';

import { AuthContext } from 'shared/contexts';

import useStyles from './auth.style';

const Auth: FC = () => {
  const classes = useStyles();
  const [isDone, setIsDone] = useState<boolean>(false);
  const { isLoading, isLogged } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      {isDone ? (
        <>
          <Route exact path={LOGIN} component={Login} />
          <Route exact path={REGISTER} component={Register} />
          <Route exact path={PROFILE} component={Profile} />

          {isLogged ? <Redirect to={HOME} /> : <Redirect to={LOGIN} />}
        </>
      ) : (
        <PreLoader isLoading={isLoading} isLogged={isLogged} setIsDone={setIsDone} />
      )}
    </div>
  );
};

export default Auth;
