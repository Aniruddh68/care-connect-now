
import React, { useState } from 'react';
import { LogIn, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('careconnect_users') || '[]');
      const user = users.find((u: any) => u.email === email);
      
      // For demo purposes, we'll just check if the user exists and accept any password
      // In a real app, you would check the password hash
      if (user) {
        // Use the context login function instead of directly setting localStorage
        login({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          loggedInAt: new Date().toISOString()
        });
        
        toast({
          title: "Success",
          description: "Login successful. Welcome back!",
        });
        
        // Ensure navigation happens after state updates
        setTimeout(() => {
          navigate('/');
        }, 100);
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password. If you're new, please create an account.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToOptions = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-care-background p-4">
      <Card className="w-full max-w-md shadow-lg relative">
        <div className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBackToOptions} 
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <CardHeader className="space-y-1 pt-10">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="Care Connect Logo" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl text-center text-care-primary">Patient Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your health profile
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs text-care-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-care-primary hover:bg-sky-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </span>
              )}
            </Button>
            <div className="text-center text-sm">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-care-primary hover:underline">Sign up</Link>
              <span className="mx-2">•</span>
              <Link to="/" className="text-care-primary hover:underline">Back to options</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserLogin;
