import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './auth.context';

import { AuthCredentials, Profile } from 'shared/model';
import { AuthService, UserService } from 'shared/services';
import { PROFILE } from 'shared/routes';

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
        setIsLoading(false);
      } catch (error) {
        history.push(PROFILE);
      }

      setIsLoading(false);
    };

    checkAuthToken();
  }, [history]);

  const login = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      await AuthService.login(credentials);
      const profile = await UserService.get();

      setProfile(profile);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      history.push(PROFILE);
    }

    setIsLoading(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, profile }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
