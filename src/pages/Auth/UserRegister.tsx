
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const UserRegister: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call an API to register the user
      // For now, we'll simulate a successful registration after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage for demo purposes
      const userData = {
        id: Date.now().toString(),
        fullName: values.fullName,
        email: values.email,
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage (in a real app, this would be handled by a backend)
      const existingUsers = JSON.parse(localStorage.getItem('careconnect_users') || '[]');
      existingUsers.push(userData);
      localStorage.setItem('careconnect_users', JSON.stringify(existingUsers));

      // Show success state
      setIsSuccess(true);
      
      toast({
        title: "Account created successfully!",
        description: "You can now log in with your credentials.",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/user-login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          <CardTitle className="text-2xl text-center text-care-primary">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create a new Care Connect patient account
          </CardDescription>
        </CardHeader>
        
        {isSuccess ? (
          <div className="py-8 px-4">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Account Created Successfully!</h3>
              <p className="text-gray-500">
                You will be redirected to the login page shortly.
              </p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-care-primary hover:bg-sky-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </span>
                  )}
                </Button>
                
                <div className="text-center text-sm">
                  <span>Already have an account? </span>
                  <Link to="/user-login" className="text-care-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default UserRegister;
