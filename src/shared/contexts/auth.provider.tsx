import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './auth.context';

import { AuthCredentials } from 'shared/model';
import { AuthService, UserService } from 'shared/services';
import { COMPLETE_PROFILE } from 'shared/routes';
import { CreateProfile } from 'modules/auth/shared/model';

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<CreateProfile | null>();
  const history = useHistory();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const { isVerified } = await AuthService.getCognitoUser();
        setIsAuthenticated(true);

        if (isVerified) {
          const profile = await UserService.get();

          if (!profile) {
            history.push(COMPLETE_PROFILE);
          }

          setProfile(profile);
        }
      } catch (error) {}

      setIsLoading(false);
    };

    checkAuthToken();
  }, [history]);

  const login = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      await AuthService.login(credentials);
      setIsAuthenticated(true);

      const profile = await UserService.get();

      if (!profile) {
        history.push(COMPLETE_PROFILE);
      }

      setProfile(profile);
    } catch (error) {}

    setIsLoading(false);
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setIsAuthenticated(false);
      setProfile(undefined);
    } catch (error) {}

    setIsLoading(false);
  };

  const createProfile = async (data: CreateProfile) => {
    try {
      setIsLoading(true);
      const response = await UserService.create(data);
      setProfile(response);
    } catch (error) {}

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, profile, login, logout, createProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
