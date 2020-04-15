import { createContext } from 'react';

import { AuthCredentials } from 'shared/model';
import { CreateProfile } from 'modules/auth/shared/model';

export interface IAuthContext {
  profile?: CreateProfile;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  createProfile: (data: CreateProfile) => Promise<void>;
}

export default createContext<IAuthContext>({
  profile: undefined,
  isLoading: true,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  createProfile: (data: CreateProfile) => Promise.resolve()
});
