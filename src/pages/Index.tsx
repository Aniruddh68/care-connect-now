
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginOptions from '@/components/auth/LoginOptions';
import { useUser } from '@/context/UserContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/patient/home');
    }
  }, [isAuthenticated, navigate]);

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
