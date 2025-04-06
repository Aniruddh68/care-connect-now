
import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from './BottomNav';
import { UserIcon, MapPinIcon, CalendarIcon, InfoIcon } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  hideNav = false,
  title = "Care Connect"
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-care-background">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <span className="text-care-primary font-bold text-2xl">{title}</span>
            </Link>
            <div className="flex space-x-2">
              <Link to="/profile" className="p-2 rounded-full hover:bg-sky-50">
                <UserIcon className="h-6 w-6 text-care-primary" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideNav && (
        <BottomNav />
      )}
    </div>
  );
};

export default MainLayout;
