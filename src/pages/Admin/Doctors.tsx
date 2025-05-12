import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAdminDoctors } from '@/hooks/use-admin-doctors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import DoctorTable from '@/components/admin/DoctorTable';
import AddDoctorForm from '@/components/admin/AddDoctorForm';
import { Doctor } from '@/types/doctor';

const AdminDoctors: React.FC = () => {
  const location = useLocation();
  const { doctors, updateDoctorStatus, addDoctor, isLoading } = useAdminDoctors();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const { toast } = useToast();

  const activeDoctors = doctors.filter(doc => doc.status === 'active');
  const inactiveDoctors = doctors.filter(doc => doc.status === 'inactive');
  
  const filteredActiveDoctors = activeDoctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredInactiveDoctors = inactiveDoctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (doctorId: string, newStatus: 'active' | 'inactive') => {
    updateDoctorStatus(doctorId, newStatus);
    toast({
      title: "Status updated",
      description: `Doctor status changed to ${newStatus}`,
    });
  };

  const handleAddDoctor = (newDoctorData: Omit<Doctor, 'id'>) => {
    if (!newDoctorData.name || !newDoctorData.specialty || !newDoctorData.hospital || !newDoctorData.email || !newDoctorData.phone) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    addDoctor(newDoctorData);
    setIsAddDoctorOpen(false);
    
    toast({
      title: "Doctor added",
      description: "New doctor has been successfully onboarded",
    });
  };

  return (
    <AdminLayout title="Doctor Management" currentPath={location.pathname}>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search doctors..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDoctorOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Doctor
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">
            Active Doctors ({filteredActiveDoctors.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive Doctors ({filteredInactiveDoctors.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          {filteredActiveDoctors.length === 0 ? (
            <div className="text-center py-4">No active doctors found</div>
          ) : (
            <DoctorTable 
              doctors={filteredActiveDoctors} 
              onStatusChange={handleStatusChange}
              isLoading={isLoading}
            />
          )}
        </TabsContent>
        <TabsContent value="inactive" className="mt-6">
          {filteredInactiveDoctors.length === 0 ? (
            <div className="text-center py-4">No inactive doctors found</div>
          ) : (
            <DoctorTable 
              doctors={filteredInactiveDoctors} 
              onStatusChange={handleStatusChange}
              isLoading={isLoading}
            />
          )}
        </TabsContent>
      </Tabs>

      <AddDoctorForm 
        isOpen={isAddDoctorOpen} 
        onClose={() => setIsAddDoctorOpen(false)} 
        onAddDoctor={handleAddDoctor}
      />
    </AdminLayout>
  );
};

export default AdminDoctors;
