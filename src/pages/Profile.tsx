
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Edit2, Save, X } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  bloodGroup: string;
  allergies: string;
  chronicConditions: string;
  currentMedications: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();
  
  const defaultValues: ProfileFormData = {
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    address: '123 Main St, Bhopal, Madhya Pradesh',
    dob: '1990-01-15',
    bloodGroup: 'O+',
    allergies: 'Penicillin, Peanuts',
    chronicConditions: 'None',
    currentMedications: 'Multivitamins'
  };
  
  const form = useForm<ProfileFormData>({
    defaultValues
  });
  
  const handleSave = (data: ProfileFormData) => {
    console.log('Saving profile data:', data);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <MainLayout title="My Profile">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-2 border-care-primary">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${form.watch('fullName')}`} alt={form.watch('fullName')} />
                    <AvatarFallback>{form.watch('fullName') ? getInitials(form.watch('fullName')) : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{form.watch('fullName')}</h2>
                    <p className="text-care-muted text-sm">Patient ID: BPL20245678</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="icon"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="submit"
                        size="icon"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              readOnly={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="email" 
                              readOnly={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="tel" 
                              readOnly={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field}
                              readOnly={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                              rows={2}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="date" 
                              readOnly={!isEditing}
                              className={!isEditing ? "bg-gray-50" : ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Medical Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            readOnly={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            readOnly={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                            rows={2}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="chronicConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chronic Conditions</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            readOnly={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                            rows={2}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currentMedications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            readOnly={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                            rows={2}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Profile;
