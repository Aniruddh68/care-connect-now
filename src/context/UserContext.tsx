import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  loggedInAt: string;
  role?: 'patient' | 'admin';
  isActive?: boolean;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  switchAccount: (userId: string) => void;
  accounts: User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Initial accounts data
const initialAccounts: User[] = [
  {
    id: '1',
    fullName: 'Aniruddh Gupta',
    email: 'aniruddhgupta148@gmail.com',
    loggedInAt: new Date().toISOString(),
    role: 'patient',
    isActive: true
  },
  {
    id: '2',
    fullName: 'Kushbu Jain',
    email: 'Kushbu@careconnect.com',
    loggedInAt: new Date().toISOString(),
    role: 'patient',
    isActive: false
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<User[]>(initialAccounts);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('careconnect_currentUser');
    const storedAccounts = localStorage.getItem('careconnect_accounts');
    
    if (storedAccounts) {
      try {
        const parsedAccounts = JSON.parse(storedAccounts);
        setAccounts(parsedAccounts);
      } catch (error) {
        console.error('Error parsing accounts:', error);
      }
    }

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('careconnect_currentUser');
      }
    }
  }, []);

  const login = (userData: User) => {
    // Update accounts if new user
    const existingAccount = accounts.find(acc => acc.email === userData.email);
    if (!existingAccount) {
      const newAccounts = accounts.map(acc => ({ ...acc, isActive: false }));
      newAccounts.push({ ...userData, isActive: true });
      setAccounts(newAccounts);
      localStorage.setItem('careconnect_accounts', JSON.stringify(newAccounts));
    } else {
      // Update existing accounts' active status
      const updatedAccounts = accounts.map(acc => ({
        ...acc,
        isActive: acc.email === userData.email
      }));
      setAccounts(updatedAccounts);
      localStorage.setItem('careconnect_accounts', JSON.stringify(updatedAccounts));
    }

    setUser(userData);
    localStorage.setItem('careconnect_currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('careconnect_currentUser');
  };

  const switchAccount = (userId: string) => {
    const selectedAccount = accounts.find(acc => acc.id === userId);
    if (selectedAccount) {
      const updatedAccounts = accounts.map(acc => ({
        ...acc,
        isActive: acc.id === userId
      }));
      setAccounts(updatedAccounts);
      setUser(selectedAccount);
      localStorage.setItem('careconnect_currentUser', JSON.stringify(selectedAccount));
      localStorage.setItem('careconnect_accounts', JSON.stringify(updatedAccounts));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      switchAccount,
      accounts
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};