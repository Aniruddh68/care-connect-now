
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Save, X } from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";

interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
}

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { user, login } = useUser();
  
  const defaultValues: ProfileFormValues = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    address: "123 Main St, Bhopal, Madhya Pradesh",
    dob: "1990-01-15"
  };
  
  const form = useForm<ProfileFormValues>({
    defaultValues
  });
  
  const handleSave = (values: ProfileFormValues) => {
    // Update the user context with new values
    if (user) {
      const updatedUser = {
        ...user,
        fullName: values.fullName,
        email: values.email,
      };
      login(updatedUser);
    }
    
    setIsEditing(false);
    console.log("Saved values:", values);
    toast({
      title: "Profile updated",
      description: "Your personal info has been updated successfully.",
    });
  };
  
  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
  };

  return (
    <MainLayout title="Personal Info">
      <section className="max-w-xl mx-auto pt-4 pb-20 px-4 sm:px-6 lg:px-0 w-full animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-care-primary">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${form.watch('fullName')}`} alt={form.watch('fullName')} />
                <AvatarFallback>{form.watch('fullName') ? form.watch('fullName').split(' ').map(n => n[0]).join('') : 'AG'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold break-all">{form.watch('fullName')}</h2>
                <p className="text-care-muted text-xs sm:text-sm">Patient ID: BPL20245678</p>
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
                    aria-label="Cancel editing"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    form="profile-form"
                    aria-label="Save changes"
                  >
                    <Save className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit profile"
                >
                  <Edit2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="profile-form" onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
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
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Address</FormLabel>
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
                
                {isEditing && (
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
};

export default ProfileSettings;
