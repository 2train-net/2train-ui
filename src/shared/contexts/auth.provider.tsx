import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext, { IUserProfile } from './auth.context';

import { AuthCredentials } from 'shared/model';
import { AuthService } from 'shared/services';
import { COMPLETE_PROFILE, CONFIRM_ACCOUNT } from 'shared/routes';
import { useUserProfileLazyQuery } from 'shared/generated/graphql-schema';

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [getUser, { data, updateQuery, refetch }] = useUserProfileLazyQuery();
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
  }, [isAuthenticated, data, getUser]);

  const login = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      await AuthService.login(credentials);
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, user: data && (data.user as any), refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
