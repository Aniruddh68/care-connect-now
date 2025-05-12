
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Search, Save } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAdminDoctors } from '@/hooks/use-admin-doctors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { TimeSlot } from '@/types/doctor';

const AdminSchedules: React.FC = () => {
  const location = useLocation();
  const { doctors, schedules, getDoctorSchedules, updateDoctorSchedule, isLoading } = useAdminDoctors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [editingSlots, setEditingSlots] = useState<TimeSlot[]>([]);
  const { toast } = useToast();

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const doctorSchedule = getDoctorSchedules(doctorId).find(s => s.date === dateStr);
      
      if (doctorSchedule) {
        setEditingSlots([...doctorSchedule.slots]);
      } else {
        // Create default slots if no schedule exists for this date
        const defaultSlots: TimeSlot[] = [];
        for (let i = 9; i < 17; i++) {
          for (let j = 0; j < 60; j += 30) {
            const startHour = i.toString().padStart(2, '0');
            const startMinute = j.toString().padStart(2, '0');
            const endHour = j === 30 ? i.toString().padStart(2, '0') : (i + 1).toString().padStart(2, '0');
            const endMinute = j === 30 ? '00' : '30';
            
            defaultSlots.push({
              id: `slot-${doctorId}-${dateStr}-${startHour}${startMinute}`,
              startTime: `${startHour}:${startMinute}`,
              endTime: `${endHour}:${endMinute}`,
              isBooked: false
            });
          }
        }
        setEditingSlots(defaultSlots);
      }
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    if (selectedDoctor) {
      const dateStr = format(date, 'yyyy-MM-dd');
      const doctorSchedule = getDoctorSchedules(selectedDoctor).find(s => s.date === dateStr);
      
      if (doctorSchedule) {
        setEditingSlots([...doctorSchedule.slots]);
      } else {
        // Create default slots if no schedule exists for this date
        const defaultSlots: TimeSlot[] = [];
        for (let i = 9; i < 17; i++) {
          for (let j = 0; j < 60; j += 30) {
            const startHour = i.toString().padStart(2, '0');
            const startMinute = j.toString().padStart(2, '0');
            const endHour = j === 30 ? i.toString().padStart(2, '0') : (i + 1).toString().padStart(2, '0');
            const endMinute = j === 30 ? '00' : '30';
            
            defaultSlots.push({
              id: `slot-${selectedDoctor}-${dateStr}-${startHour}${startMinute}`,
              startTime: `${startHour}:${startMinute}`,
              endTime: `${endHour}:${endMinute}`,
              isBooked: false
            });
          }
        }
        setEditingSlots(defaultSlots);
      }
    }
  };

  const toggleSlotAvailability = (slotId: string) => {
    setEditingSlots(currentSlots => 
      currentSlots.map(slot => 
        slot.id === slotId && !slot.isBooked ? 
          { ...slot, isBooked: !slot.isBooked } : 
          slot
      )
    );
  };

  const saveSchedule = () => {
    if (!selectedDoctor || !selectedDate) return;

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    updateDoctorSchedule(selectedDoctor, dateStr, editingSlots);
    
    toast({
      title: "Schedule Updated",
      description: `Schedule for ${doctors.find(d => d.id === selectedDoctor)?.name} on ${format(selectedDate, 'MMM dd, yyyy')} has been updated`,
    });
  };

  return (
    <AdminLayout title="Schedule Management" currentPath={location.pathname}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Doctor Selection */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Select a Doctor</h2>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search doctors..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto">
            {filteredDoctors.map(doctor => (
              <div
                key={doctor.id}
                className={`flex items-center p-2 rounded-md cursor-pointer ${
                  selectedDoctor === doctor.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleDoctorSelect(doctor.id)}
              >
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium text-sm">{doctor.name}</h3>
                  <p className="text-xs text-gray-500">{doctor.specialty}</p>
                </div>
                <div className={`ml-auto w-2 h-2 rounded-full ${
                  doctor.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </div>
            ))}
            
            {filteredDoctors.length === 0 && (
              <p className="text-center text-sm text-gray-500 py-4">No doctors found</p>
            )}
          </div>
        </div>
        
        {/* Middle - Calendar */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </div>
        </div>
        
        {/* Right side - Time slots */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Time Slots</h2>
            {selectedDoctor && selectedDate && (
              <Button 
                onClick={saveSchedule} 
                disabled={isLoading || !selectedDoctor || !selectedDate}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Schedule
              </Button>
            )}
          </div>
          
          {!selectedDoctor ? (
            <p className="text-center text-sm text-gray-500 py-4">Please select a doctor first</p>
          ) : !selectedDate ? (
            <p className="text-center text-sm text-gray-500 py-4">Please select a date</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[calc(100vh-240px)] overflow-y-auto">
              {editingSlots.map(slot => (
                <div
                  key={slot.id}
                  className={`p-3 rounded-md border cursor-pointer flex items-center ${
                    slot.isBooked
                      ? 'bg-red-50 border-red-200 cursor-not-allowed'
                      : 'bg-green-50 border-green-200 hover:bg-green-100'
                  }`}
                  onClick={() => !slot.isBooked && toggleSlotAvailability(slot.id)}
                >
                  <Clock className={`h-4 w-4 mr-2 ${slot.isBooked ? 'text-red-500' : 'text-green-500'}`} />
                  <div>
                    <p className="text-sm font-medium">
                      {slot.startTime} - {slot.endTime}
                    </p>
                    <p className="text-xs text-gray-500">
                      {slot.isBooked ? 'Booked' : 'Available'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSchedules;
