
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Calendar, CheckSquare, AlertTriangle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/context/AdminContext';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: CheckSquare },
  { label: 'Doctors', path: '/admin/doctors', icon: Users },
  { label: 'Schedules', path: '/admin/schedules', icon: Calendar },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, currentPath }) => {
  const { admin, logout, systemStatus } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!admin) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-care-dark text-white shadow-lg">
        <div className="p-4 flex items-center">
          <img src="/logo.png" alt="Care Connect Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Care Connect</span>
        </div>
        <p className="px-4 py-1 text-sm text-gray-400">Admin Panel</p>
        
        <Separator className="bg-gray-700 my-2" />
        
        <div className="p-4">
          <p className="text-sm font-semibold">{admin.name}</p>
          <p className="text-xs text-gray-400">{admin.email}</p>
        </div>
        
        <Separator className="bg-gray-700 my-2" />
        
        <nav className="space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={currentPath === item.path ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                currentPath === item.path ? 'bg-sky-800' : 'hover:bg-sky-900'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4">
          <Separator className="bg-gray-700 mb-4" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm">System Status:</span>
            <div className="flex items-center">
              <div 
                className={`h-2 w-2 rounded-full mr-2 ${
                  systemStatus === 'online' ? 'bg-green-500' : 
                  systemStatus === 'syncing' ? 'bg-yellow-500' : 'bg-red-500'
                }`} 
              />
              <span className="text-sm capitalize">{systemStatus}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {systemStatus === 'syncing' && (
            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <span>Syncing changes to user app...</span>
            </div>
          )}
          {systemStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span>Error syncing data. Some changes may not be reflected.</span>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
