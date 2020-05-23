import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './auth.context';

import { AuthCredentials } from 'shared/model';
import { AuthService } from 'shared/services';
import { COMPLETE_PROFILE } from 'shared/routes';
import { useUserLazyQuery } from 'shared/generated/graphql-schema';

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [getUser, { data }] = useUserLazyQuery();
  const history = useHistory();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const { email, isVerified } = await AuthService.getCognitoUser();
        setIsAuthenticated(true);

        if (isVerified) {
          getUser({ variables: { where: { email } } });

          if (!data!.user) {
            history.push(COMPLETE_PROFILE);
          }
        }
      } catch (error) {}

      setIsLoading(false);
    };

    checkAuthToken();
  }, [history, isAuthenticated, data, getUser]);

  const login = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      await AuthService.login(credentials);
      setIsAuthenticated(true);
    } catch (error) {}

    setIsLoading(false);
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setIsAuthenticated(false);
    } catch (error) {}

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, user: data && data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
