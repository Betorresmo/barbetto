import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthData {
  user: object;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>({} as AuthData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [user, token] = await AsyncStorage.multiGet([
        '@barbetto:user',
        '@barbetto:token',
      ]);

      if (user[1] && token[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@barbetto:user', JSON.stringify(user)],
      ['@barbetto:token', token],
    ]);

    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@barbetto:user', '@barbetto:token']);

    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
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

export { AuthProvider, useAuth };
