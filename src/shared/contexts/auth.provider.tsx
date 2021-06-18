import React, { FC, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from 'react-apollo';

import AuthContext from './auth.context';

import { AuthCredentials, IUserProfile } from 'shared/model';
import { AuthService } from 'shared/services';
import { CONFIRM_ACCOUNT } from 'shared/routes';
import { Message } from 'shared/modules';
import { WRONG_CREDENTIALS_ERROR_TEXT } from 'shared/constants';
import { useUserProfileLazyQuery } from 'shared/generated';

const AuthProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const history = useHistory();
  const client = useApolloClient();

  const [getUser, { data, updateQuery, refetch }] = useUserProfileLazyQuery();

  const user = data && (data.user as IUserProfile);

  const checkAuthToken = useCallback(async () => {
    try {
      const { email, isVerified } = await AuthService.getCognitoUser();

      setIsAuthenticated(true);

      if (isVerified) {
        await getUser({ variables: { where: { email } } });
      } else {
        history.push(CONFIRM_ACCOUNT, { email });
      }
    } catch (error) {}

    setIsLoading(false);
  }, [history, getUser]);

  const login = async ({ credentials }: AuthCredentials) => {
    try {
      const { email, password } = credentials;

      setIsLoading(true);

      await AuthService.login(email, password);

      setIsAuthenticated(true);
    } catch (error) {
      setIsLoading(false);

      if (error.code === 'UserNotConfirmedException') {
        history.push(CONFIRM_ACCOUNT, { ...credentials });
      } else if (error.code === 'NotAuthorizedException') {
        Message.error(WRONG_CREDENTIALS_ERROR_TEXT);
      }
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      await client.clearStore();
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

  useEffect(() => {
    checkAuthToken();
  }, [isAuthenticated, user, checkAuthToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, refreshUser, verifyAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
