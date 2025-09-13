'use client';

import { checkSession, getMe } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } finally {
        setIsRefreshing(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isRefreshing) {
    return null;
  }

  return children;
};

export default AuthProvider;
