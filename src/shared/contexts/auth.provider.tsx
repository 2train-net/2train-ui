import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './auth.context';

import { AuthCredentials, Profile } from 'shared/model';
import { AuthService, UserService } from 'shared/services';
import { COMPLETE_PROFILE } from 'shared/routes';

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile>();
  const history = useHistory();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const isValid = await AuthService.verifyToken();

        if (isValid) {
          const newProfile = await UserService.get();
          setProfile(newProfile);
        }

        setIsAuthenticated(isValid);
      } catch (error) {
        history.push(COMPLETE_PROFILE);
      }

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
      setProfile(profile);
    } catch (error) {
      history.push(COMPLETE_PROFILE);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setProfile(undefined);
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
