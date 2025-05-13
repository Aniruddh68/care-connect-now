
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoginOptions from '@/components/auth/LoginOptions';

const HomePage: React.FC = () => {
  return (
    <MainLayout hideNav={true}>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginOptions />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
