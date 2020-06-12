import { createContext } from 'react';

import { AuthCredentials } from 'shared/model';
import { UserStatus, UserTypes } from 'shared/generated/graphql-schema';

interface IUserProfile {
  uuid: string;
  email: string;
  avatar?: string | null;
  status: UserStatus;
  type: { id: UserTypes };
  gym?: { id: number } | null;
  trainer?: { id: number } | null;
  customer?: { id: number } | null;
}

export interface IAuthContext {
  user?: IUserProfile;
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
