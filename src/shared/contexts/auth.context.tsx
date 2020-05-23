import { createContext } from 'react';

import { AuthCredentials } from 'shared/model';

export interface IAuthContext {
  user?: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export default createContext<IAuthContext>({
  user: undefined,
  isLoading: true,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});
