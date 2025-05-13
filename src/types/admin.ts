export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  lastLogin?: Date;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export type SystemStatus = 'online' | 'syncing' | 'error';