import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { User, Bell, Lock, HelpCircle, LogOut, Users, Shield, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MultipleAccounts from '@/components/settings/MultipleAccounts';
import { useUser } from '@/context/UserContext';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const { logout, user } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  const settingsItems = [
    {
      icon: User,
      label: 'Personal Information',
      description: 'Manage your profile details',
      path: '/settings/profile'
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Set your notification preferences',
      path: '/settings/notifications'
    },
    {
      icon: Lock,
      label: 'Privacy & Security',
      description: 'Manage your account security',
      path: '/settings/privacy',
      subItems: [
        {
          icon: Shield,
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security'
        },
        {
          icon: Key,
          label: 'Change Password',
          description: 'Update your login credentials'
        }
      ]
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help with the app',
      path: '/settings/help'
    }
  ];
  
  return (
    <MainLayout title="Settings">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6 bg-white rounded-xl shadow p-4 flex items-center">
          <div className="bg-care-primary h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
            {user?.fullName?.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="font-bold text-lg">{user?.fullName}</h2>
            <p className="text-care-muted">{user?.email}</p>
            <p className="text-sm text-care-muted">+91 98765 43210</p>
          </div>
        </div>
        
        <MultipleAccounts />
        
        <div className="mb-6">
          <h3 className="text-lg font-bold text-care-dark mb-3">Settings</h3>
          
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {settingsItems.map((item, index) => (
              <React.Fragment key={item.path}>
                <Link 
                  to={item.path}
                  className="flex items-center p-4 hover:bg-gray-50"
                >
                  <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    <item.icon className="h-5 w-5 text-care-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-care-muted">{item.description}</p>
                  </div>
                  <div className="text-care-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </Link>
                {item.subItems && (
                  <div className="pl-16 pr-4 pb-4 -mt-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <div key={subItem.label} className="flex items-center p-2 rounded hover:bg-gray-50">
                        <subItem.icon className="h-4 w-4 text-care-muted mr-2" />
                        <div>
                          <h5 className="text-sm font-medium">{subItem.label}</h5>
                          <p className="text-xs text-care-muted">{subItem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {index < settingsItems.length - 1 && (
                  <div className="border-b border-gray-100"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full p-4 flex items-center justify-center bg-white rounded-xl shadow text-red-500 font-medium"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log Out
        </button>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;