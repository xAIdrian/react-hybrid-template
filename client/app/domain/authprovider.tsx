import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: object | null;
  signIn: (userCredentials: object) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);

  const signIn = (userCredentials: object) => {
    // Implement your sign-in logic here
    setUser({ ...userCredentials });
  };

  const signOut = () => {
    // Implement sign-out logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
