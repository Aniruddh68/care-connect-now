import React, { createContext, useContext, useState } from 'react';
import { Admin, AdminLoginCredentials, SystemStatus } from '@/types/admin';

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  systemStatus: SystemStatus;
  login: (credentials: AdminLoginCredentials) => Promise<boolean>;
  logout: () => void;
  setSystemStatus: (status: SystemStatus) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('online');

  // Mock login function - would be replaced with actual API call
  const login = async (credentials: AdminLoginCredentials): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, accept any email that ends with @careconnect.com and password "admin"
      if (credentials.email.endsWith('@careconnect.com') && credentials.password === 'admin') {
        setAdmin({
          id: '1',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: 'admin',
          lastLogin: new Date()
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ 
      admin, 
      isAuthenticated: !!admin, 
      systemStatus,
      login, 
      logout,
      setSystemStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};