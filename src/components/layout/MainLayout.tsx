
import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from './BottomNav';
import { UserIcon, WalletCards } from 'lucide-react';

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
                className="h-10 w-10 object-contain rounded-full shadow-sm border border-gray-100"
              />
              <span className="bg-gradient-to-r from-care-primary to-sky-500 bg-clip-text font-bold text-2xl text-transparent">
                {title}
              </span>
            </Link>
            
            <nav className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                to="/payment/history" 
                className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-care-primary hover:text-sky-600 transition-colors"
              >
                <span>History</span>
              </Link>
              
              <Link 
                to="/payment" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-care-primary to-sky-500 text-white hover:opacity-90 transition shadow-sm"
              >
                <WalletCards className="h-5 w-5" />
                <span className="hidden sm:inline">Payments</span>
              </Link>
              
              <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block" />
              
              <Link 
                to="/profile" 
                className="p-2 rounded-full hover:bg-sky-50 transition-colors"
                aria-label="Profile"
              >
                <UserIcon className="h-6 w-6 text-care-primary" />
              </Link>
            </nav>
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
