
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Save } from "lucide-react";

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your personal info has been updated successfully.",
    });
  };

  // Responsive layout with graceful wrapping and mobile-optimized controls
  return (
    <MainLayout title="Personal Info">
      <section className="max-w-xl mx-auto pt-4 pb-20 px-4 sm:px-6 lg:px-0 w-full animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-care-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" alt="Profile" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold break-all">John Doe</h2>
                <p className="text-care-muted text-xs sm:text-sm">Patient ID: BPL20245678</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="mt-2 sm:mt-0 self-end"
              onClick={() => setIsEditing((v) => !v)}
            >
              {isEditing ? <Save className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value="johndoe@example.com"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value="+91 98765 43210"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value="123 Main St, Bhopal, Madhya Pradesh"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value="1990-01-15"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
            </div>
            {isEditing && (
              <div className="pt-6 flex justify-end">
                <Button onClick={handleSave} className="px-8">Save Changes</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
};

export default ProfileSettings;
