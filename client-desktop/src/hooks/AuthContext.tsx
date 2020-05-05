import React, { createContext, useContext, useCallback, useState } from 'react';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthData {
  user: object;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const user = localStorage.getItem('@barbetto:user');
    const token = localStorage.getItem('@barbetto:token');

    if (user && token) {
      return {
        user: JSON.parse(user),
        token,
      };
    }

    return {} as AuthData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@barbetto:user', JSON.stringify(user));
    localStorage.setItem('@barbetto:token', token);

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@barbetto:user');
    localStorage.removeItem('@barbetto:token');

    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  if (!AuthContext) {
    throw new Error('useAuth must be inside an AuthProvider.');
  }

  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
