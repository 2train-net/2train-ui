import React, { FC, useState, useEffect } from 'react';

import AuthContext from './auth.context';

import { AuthCredentials, Profile } from 'shared/model';
import { AuthService, UserService } from 'shared/services';

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile>();

  const login = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    await AuthService.login(credentials);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      const isValid = await AuthService.verifyToken();
      setIsAuthenticated(isValid);
      setIsLoading(false);
    };

    checkAuthToken();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        const response = await UserService.get();
        setProfile(response);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, profile }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
