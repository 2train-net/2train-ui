import { createContext } from 'react';

import { AuthCredentials } from 'shared/model';
import { UserStatus, UserType, Gender } from 'shared/generated/graphql-schema';

export interface IUserProfile {
  uuid: string;
  email: string;
  avatar?: string | null;
  status: UserStatus;
  person?: {
    firstName: string;
    lastName: string;
    phone: string;
    gender?: Gender | null | undefined;
    birthday?: string;
  };
  type: { id: UserType };
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
  refreshUser: (data?: IUserProfile) => void;
}

export default createContext<IAuthContext>({
  user: undefined,
  isLoading: true,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  refreshUser: () => {}
});
