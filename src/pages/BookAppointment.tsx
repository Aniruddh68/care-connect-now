
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar, Clock, CheckIcon } from 'lucide-react';
import { Doctor } from '@/components/common/DoctorCard';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockDoctors: Record<string, Doctor> = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    hospital: 'City Medical Center',
    distance: '1.2 miles',
    availableToday: true,
    rating: 4.8
  },
  '2': {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    hospital: 'General Hospital',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.7
  }
};

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
];

const BookAppointmentPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');
  
  // Load doctor data
  useEffect(() => {
    if (doctorId && mockDoctors[doctorId]) {
      setDoctor(mockDoctors[doctorId]);
    }
  }, [doctorId]);
  
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset time when date changes
  };
  
  const handleBookAppointment = () => {
    if (!selectedTime) {
      toast({
        title: "Please select a time slot",
        variant: "destructive"
      });
      return;
    }
    
    // This would be an API call in a real app
    console.log('Booking appointment:', {
      doctorId,
      date: selectedDate,
      time: selectedTime,
      reason
    });
    
    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${doctor?.name} on ${format(selectedDate, 'PPP')} at ${selectedTime} has been confirmed.`,
      variant: "default"
    });
    
    // Navigate to appointments page
    navigate('/appointments');
  };
  
  if (!doctor) {
    return (
      <MainLayout title="Book Appointment">
        <div className="max-w-lg mx-auto px-4 py-8 text-center">
          <p>Doctor not found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title="Book Appointment">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex items-center">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-care-primary mr-4"
            />
            <div>
              <h2 className="font-bold text-lg">{doctor.name}</h2>
              <p className="text-care-muted">{doctor.specialty}</p>
              <p className="text-sm text-care-muted">{doctor.hospital}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-care-primary" />
            Select Date
          </h3>
          
          <div className="bg-white rounded-xl shadow p-4">
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
                const date = new Date();
                date.setDate(date.getDate() + dayOffset);
                
                const isSelected = 
                  selectedDate.getDate() === date.getDate() && 
                  selectedDate.getMonth() === date.getMonth();
                
                return (
                  <button
                    key={dayOffset}
                    onClick={() => handleDateChange(date)}
                    className={`p-3 rounded-lg text-center ${
                      isSelected 
                        ? 'bg-care-primary text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-xs font-medium">
                      {format(date, 'EEE')}
                    </div>
                    <div className="text-lg font-bold">
                      {format(date, 'd')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-care-primary" />
            Select Time
          </h3>
          
          <div className="bg-white rounded-xl shadow p-4">
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-center ${
                    selectedTime === time 
                      ? 'bg-care-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">Reason for Visit</h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Briefly describe your symptoms or reason for the appointment..."
            className="w-full p-3 bg-white rounded-xl border border-gray-200 focus:border-care-primary focus:ring-1 focus:ring-care-primary focus:outline-none h-24"
          />
        </div>
        
        <button
          onClick={handleBookAppointment}
          className="w-full primary-button flex items-center justify-center py-4"
        >
          <CheckIcon className="mr-2 h-5 w-5" />
          Confirm Appointment
        </button>
      </div>
    </MainLayout>
  );
};

export default BookAppointmentPage;
