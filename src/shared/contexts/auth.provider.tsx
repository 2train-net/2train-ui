import React, { FC, useState, useEffect } from 'react';

import AuthContext from './auth.context';

const AuthProvider: FC = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLogged(false);
      setIsLoading(false);
    }, 3000);
  }, []);

  return <AuthContext.Provider value={{ isLogged, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
