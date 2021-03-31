import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './auth.context';

import { AuthCredentials, IUserProfile } from 'shared/model';
import { AuthService } from 'shared/services';
import { CONFIRM_ACCOUNT } from 'shared/routes';
import { useUserProfileLazyQuery } from 'shared/generated/graphql-schema';

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [getUser, { data, updateQuery, refetch }] = useUserProfileLazyQuery();
  const history = useHistory();

  const user = data && (data.user as IUserProfile);

  useEffect(() => {
    checkAuthToken();
  }, [isAuthenticated, user, getUser]);

  const checkAuthToken = async () => {
    try {
      const { email, isVerified } = await AuthService.getCognitoUser();

      setIsAuthenticated(true);

      if (isVerified) {
        getUser({ variables: { where: { email } } });
      } else {
        history.push(CONFIRM_ACCOUNT, { email });
      }
    } catch (error) {}

    setIsLoading(false);
  };

  const login = async ({ credentials }: AuthCredentials) => {
    try {
      const { email, password } = credentials;

      setIsLoading(true);

      await AuthService.login(email, password);

      setIsAuthenticated(true);
    } catch (error) {
      if (error.name === 'UserNotConfirmedException') {
        history.push(CONFIRM_ACCOUNT, { ...credentials });
      }
    }

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

  const refreshUser = (data?: IUserProfile) => {
    if (data) {
      updateQuery(({ user }) => ({
        user: {
          ...user,
          ...data
        }
      }));
    } else {
      refetch();
    }
  };

  const verifyAccount = async (code: string, email: string, password?: string) => {
    try {
      await AuthService.confirmSignUp(email, code);

      if (password) {
        const credentials = new AuthCredentials({ email, password });

        await login(credentials);
      } else {
        checkAuthToken();
      }
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, refreshUser, verifyAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
