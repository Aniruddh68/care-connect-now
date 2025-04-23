
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
  title = "Care Connect Bhopal"
}) => {
  return <div className="flex flex-col min-h-screen bg-care-background">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Care Connect Logo" 
                className="h-10 w-10 object-contain rounded-full" // Added rounded-full for potential logo styling
              />
              <span className="bg-gradient-to-r from-care-primary to-sky-500 bg-clip-text font-bold text-2xl text-cyan-500 text-left">
                {title}
              </span>
            </Link>
            <div className="flex space-x-2">
              <Link to="/profile" className="p-2 rounded-full hover:bg-sky-50 transition-colors">
                <UserIcon className="h-6 w-6 text-care-primary" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow relative">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-5 bg-dot-pattern"></div>
        <div className="relative z-1">
          {children}
        </div>
      </main>
      
      {!hideNav && <BottomNav />}
    </div>;
};

export default MainLayout;
