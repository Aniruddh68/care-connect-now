import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const LoginOptions = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  const handleUserLogin = () => {
    navigate('/user-login');
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <img src="/logo.png" alt="Care Connect Logo" className="h-16 w-16" />
        </div>
        <CardTitle className="text-2xl text-center text-care-primary">Welcome to Care Connect</CardTitle>
        <CardDescription className="text-center">
          Choose how you want to access the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Button 
          onClick={handleUserLogin}
          className="w-full py-6 text-lg justify-between group hover:bg-care-primary hover:text-white"
          variant="outline"
        >
          <div className="flex items-center">
            <UserRound className="mr-3 h-6 w-6" />
            <span>Login as Patient</span>
          </div>
          <span className="text-gray-400 group-hover:text-white">&rarr;</span>
        </Button>
        
        <Button 
          onClick={handleAdminLogin}
          className="w-full py-6 text-lg justify-between group hover:bg-care-dark hover:text-white"
          variant="outline"
        >
          <div className="flex items-center">
            <ShieldCheck className="mr-3 h-6 w-6" />
            <span>Login as Admin</span>
          </div>
          <span className="text-gray-400 group-hover:text-white">&rarr;</span>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <span className="text-sm text-center text-gray-500 w-full">
          New to Care Connect? 
          <button 
            onClick={handleCreateAccount} 
            className="text-care-primary ml-1 hover:underline"
          >
            Create an account
          </button>
        </span>
      </CardFooter>
    </Card>
  );
};

export default LoginOptions;