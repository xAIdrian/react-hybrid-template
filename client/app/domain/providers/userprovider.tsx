import { UserContextType, User } from '@/models/user';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAccessToken, deleteSession } from './sessionprovider';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const token = await getAccessToken();
      if (token) {
        // Assume fetchUserData is a function that fetches user data
        // const userData: User = await fetchUserData(token);
        // setUser(userData);
      }
    };
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
  
  async function logout(): Promise<void> {
    deleteSession();  // Delete session using deleteSession from sessionprovider
    setUser(null);  // Reset user state using setUser from useUser hook
  }
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

