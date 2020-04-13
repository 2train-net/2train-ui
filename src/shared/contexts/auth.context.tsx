import { createContext } from 'react';

import { AuthCredentials, Profile } from 'shared/model';

export interface IAuthContext {
  profile?: Profile;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  createProfile: (data: Profile) => Promise<void>;
}

export default createContext<IAuthContext>({
  profile: undefined,
  isLoading: true,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  createProfile: (data: Profile) => Promise.resolve()
});
