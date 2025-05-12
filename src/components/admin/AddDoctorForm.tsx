
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Doctor } from '@/types/doctor';

type NewDoctorData = Omit<Doctor, 'id'>;

interface AddDoctorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDoctor: (doctor: Omit<Doctor, 'id'>) => void;
}

const AddDoctorForm: React.FC<AddDoctorFormProps> = ({ isOpen, onClose, onAddDoctor }) => {
  const [newDoctor, setNewDoctor] = useState<NewDoctorData>({
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

  const handleSubmit = () => {
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.hospital || !newDoctor.email || !newDoctor.phone) {
      return;
    }
    
    onAddDoctor(newDoctor);
    
    // Reset the form
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                onCheckedChange={(checked) => {
                  setNewDoctor({
                    ...newDoctor, 
                    status: checked ? 'active' : 'inactive'
                  });
                }}
              />
              <label htmlFor="active" className="text-sm font-medium">
                {newDoctor.status === 'active' ? 'Active' : 'Inactive'}
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Doctor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorForm;
