import React, { useEffect, useState } from 'react';
import { addUser, loginByCpf} from '../utils/apiClient';
import { AuthContext } from './authContextValue';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // no token-based restore: auth is credential-only
  }, []);

  const login = async (cpf, password) => {
    setLoading(true);
    try {
      const res = await loginByCpf(cpf, password);
      setUser(res?.user || null);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const res = await addUser(payload);
      return res;
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    // no token to remove in credential-only auth
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// keep provider only in this file
