import { createContext } from 'react';

import { AuthCredentials, IUserProfile } from 'shared/model';

export interface IAuthContext {
  user?: IUserProfile;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: (data?: IUserProfile) => void;
  verifyAccount: (code: string, email: string, password?: string) => Promise<void>;
}

export default createContext<IAuthContext>({
  user: undefined,
  isLoading: true,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  refreshUser: () => {},
  verifyAccount: () => Promise.resolve()
});
