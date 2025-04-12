
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, CalendarIcon, MapPinIcon, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const navItems = [
    { 
      icon: HomeIcon, 
      label: 'Home', 
      path: '/',
      isActive: path === '/' 
    },
    { 
      icon: SearchIcon, 
      label: 'Find', 
      path: '/find',
      isActive: path.startsWith('/find') 
    },
    { 
      icon: CalendarIcon, 
      label: 'Appointments', 
      path: '/appointments',
      isActive: path.startsWith('/appointments') 
    },
    { 
      icon: MapPinIcon, 
      label: 'Nearby', 
      path: '/nearby',
      isActive: path.startsWith('/nearby') 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      isActive: path.startsWith('/settings') 
    },
  ];
  
  return (
    <div className="fixed bottom-0 inset-x-0 z-10 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-lg rounded-t-xl">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center transition-colors relative",
              item.isActive 
                ? "text-care-primary" 
                : "text-gray-500 hover:text-care-primary"
            )}
          >
            {item.isActive && (
              <span className="absolute -top-1.5 w-1/2 h-1 bg-care-primary rounded-full" />
            )}
            <item.icon className={cn(
              "h-6 w-6 transition-transform",
              item.isActive ? "text-care-primary scale-110" : "text-gray-500"
            )} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
