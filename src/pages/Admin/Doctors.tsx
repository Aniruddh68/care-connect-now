import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserPlus, UserMinus, Edit, Search, Plus } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAdminDoctors } from '@/hooks/use-admin-doctors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const AdminDoctors: React.FC = () => {
  const location = useLocation();
  const { doctors, updateDoctorStatus, addDoctor, isLoading } = useAdminDoctors();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    hospital: '',
    distance: '0 km',
    availableToday: true,
    rating: 4.5,
    status: 'active' as const,
    email: '',
    phone: '',
    bio: ''
  });
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

  const handleAddDoctor = () => {
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.hospital || !newDoctor.email || !newDoctor.phone) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    addDoctor(newDoctor);
    setIsAddDoctorOpen(false);
    setNewDoctor({
      name: '',
      specialty: '',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      hospital: '',
      distance: '0 km',
      availableToday: true,
      rating: 4.5,
      status: 'active',
      email: '',
      phone: '',
      bio: ''
    });

    toast({
      title: "Doctor added",
      description: "New doctor has been successfully onboarded",
    });
  };

  const renderDoctorTable = (docList: typeof doctors) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {docList.map(doctor => (
            <tr key={doctor.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={doctor.imageUrl} alt={doctor.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                    <div className="text-sm text-gray-500">Rating: {doctor.rating}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{doctor.email}</div>
                <div className="text-sm text-gray-500">{doctor.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{doctor.hospital}</div>
                <div className="text-sm text-gray-500">Distance: {doctor.distance}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctor.specialty}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {doctor.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleStatusChange(doctor.id, doctor.status === 'active' ? 'inactive' : 'active')}
                    disabled={isLoading}
                  >
                    {doctor.status === 'active' ? (
                      <UserMinus className="h-4 w-4 mr-2 text-red-500" />
                    ) : (
                      <UserPlus className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    {doctor.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
            renderDoctorTable(filteredActiveDoctors)
          )}
        </TabsContent>
        <TabsContent value="inactive" className="mt-6">
          {filteredInactiveDoctors.length === 0 ? (
            <div className="text-center py-4">No inactive doctors found</div>
          ) : (
            renderDoctorTable(filteredInactiveDoctors)
          )}
        </TabsContent>
      </Tabs>

      {/* Add Doctor Dialog */}
      <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
            <DialogDescription>
              Enter the doctor's information below to onboard them to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">Name</label>
              <Input
                id="name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                className="col-span-3"
                placeholder="Dr. Full Name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="specialty" className="text-right text-sm font-medium">Specialty</label>
              <Input
                id="specialty"
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                className="col-span-3"
                placeholder="e.g. Cardiologist"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="hospital" className="text-right text-sm font-medium">Hospital</label>
              <Input
                id="hospital"
                value={newDoctor.hospital}
                onChange={(e) => setNewDoctor({...newDoctor, hospital: e.target.value})}
                className="col-span-3"
                placeholder="Hospital Name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                className="col-span-3"
                placeholder="doctor@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right text-sm font-medium">Phone</label>
              <Input
                id="phone"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                className="col-span-3"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right text-sm font-medium">Bio</label>
              <Input
                id="bio"
                value={newDoctor.bio}
                onChange={(e) => setNewDoctor({...newDoctor, bio: e.target.value})}
                className="col-span-3"
                placeholder="Brief professional description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="active" className="text-right text-sm font-medium">Active Status</label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch 
                  id="active" 
                  checked={newDoctor.status === 'active'} 
                  onCheckedChange={(checked) => 
                    setNewDoctor({...newDoctor, status: checked ? 'active' : 'inactive' as 'active' | 'inactive'})
                  } 
                />
                <label htmlFor="active" className="text-sm font-medium">
                  {newDoctor.status === 'active' ? 'Active' : 'Inactive'}
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDoctorOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDoctor}>Add Doctor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDoctors;
