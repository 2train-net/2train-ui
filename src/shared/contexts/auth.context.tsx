import { createContext } from 'react';

export interface IAuthContext {
  isLogged: boolean;
  isLoading: boolean;
}

export default createContext<IAuthContext>({
  isLogged: false,
  isLoading: true
});
