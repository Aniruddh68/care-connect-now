
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar, Clock, CheckIcon } from 'lucide-react';
import { Doctor } from '@/components/common/DoctorCard';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';

// Import mock doctors from FindDoctor page
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    hospital: 'Bhopal Medical Center',
    distance: '1.2 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Dr. Rebecca Martinez',
    specialty: 'Pediatrician',
    imageUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
    hospital: 'Bhopal Children\'s Hospital',
    distance: '2.4 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tomorrow',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
    hospital: 'Bhopal University Hospital',
    distance: '3.1 miles',
    availableToday: false,
    nextAvailable: 'Next available: Friday',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Dr. Emily Patel',
    specialty: 'Dermatologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/37.jpg',
    hospital: 'Bhopal Skin & Care Clinic',
    distance: '1.7 miles',
    availableToday: true,
    rating: 4.9
  },
  {
    id: '6',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
    hospital: 'Digestive Health Center',
    distance: '2.2 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '7',
    name: 'Dr. Priya Sharma',
    specialty: 'Psychiatrist',
    imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    hospital: 'Mental Wellness Clinic',
    distance: '1.5 miles',
    availableToday: false,
    nextAvailable: 'Next available: Monday',
    rating: 4.8
  },
  {
    id: '8',
    name: 'Dr. Daniel Lee',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
    hospital: 'Bhopal Eye Institute',
    distance: '3.5 miles',
    availableToday: true,
    rating: 4.6
  },
  {
    id: '9',
    name: 'Dr. Aisha Khan',
    specialty: 'Endocrinologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    hospital: 'Diabetes & Hormone Center',
    distance: '1.8 miles',
    availableToday: false,
    nextAvailable: 'Next available: Wednesday',
    rating: 4.9
  },
  {
    id: '10',
    name: 'Dr. Robert Williams',
    specialty: 'Pulmonologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    hospital: 'Respiratory Care Hospital',
    distance: '2.7 miles',
    availableToday: true,
    rating: 4.5
  },
  {
    id: '11',
    name: 'Dr. Lisa Johnson',
    specialty: 'Urologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    hospital: 'Urology Specialists Center',
    distance: '1.9 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '12',
    name: 'Dr. Arjun Patel',
    specialty: 'Nephrologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    hospital: 'Kidney Care Institute',
    distance: '2.8 miles',
    availableToday: false,
    nextAvailable: 'Next available: Thursday',
    rating: 4.8
  },
  {
    id: '13',
    name: 'Dr. Sophia Chen',
    specialty: 'Cardiologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/42.jpg',
    hospital: 'Heart & Vascular Institute',
    distance: '3.2 miles',
    availableToday: true,
    rating: 4.9
  },
  {
    id: '14',
    name: 'Dr. William Taylor',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
    hospital: 'Joint & Spine Center',
    distance: '1.6 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tuesday',
    rating: 4.7
  },
  {
    id: '15',
    name: 'Dr. Neha Gupta',
    specialty: 'Neurologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/59.jpg',
    hospital: 'Neuroscience Institute',
    distance: '2.5 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '16',
    name: 'Dr. Thomas Rodriguez',
    specialty: 'Dermatologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
    hospital: 'Skin Health Center',
    distance: '0.9 miles',
    availableToday: true,
    rating: 4.6
  },
  {
    id: '17',
    name: 'Dr. Maria Garcia',
    specialty: 'Endocrinologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
    hospital: 'Hormone & Metabolic Center',
    distance: '3.4 miles',
    availableToday: false,
    nextAvailable: 'Next available: Friday',
    rating: 4.7
  },
  {
    id: '18',
    name: 'Dr. David Wilson',
    specialty: 'Pulmonologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/86.jpg',
    hospital: 'Lung & Breathing Center',
    distance: '2.1 miles',
    availableToday: true,
    rating: 4.5
  },
  {
    id: '19',
    name: 'Dr. Ananya Sharma',
    specialty: 'Pediatrician',
    imageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
    hospital: 'Children\'s Wellness Center',
    distance: '1.3 miles',
    availableToday: true,
    rating: 4.9
  },
  {
    id: '20',
    name: 'Dr. Richard Brown',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
    hospital: 'GI Health Institute',
    distance: '2.9 miles',
    availableToday: false,
    nextAvailable: 'Next available: Next Tuesday',
    rating: 4.6
  },
  {
    id: '21',
    name: 'Dr. Emma Thompson',
    specialty: 'Gynecologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/77.jpg',
    hospital: 'Women\'s Health Center',
    distance: '1.8 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '22',
    name: 'Dr. Vikram Singh',
    specialty: 'Cardiologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/74.jpg',
    hospital: 'Cardiac Care Hospital',
    distance: '3.7 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tomorrow',
    rating: 4.7
  },
  {
    id: '23',
    name: 'Dr. Jessica Lee',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
    hospital: 'Vision Care Center',
    distance: '2.3 miles',
    availableToday: true,
    rating: 4.6
  },
  {
    id: '24',
    name: 'Dr. Samuel Martinez',
    specialty: 'Psychiatrist',
    imageUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    hospital: 'Behavioral Health Institute',
    distance: '1.5 miles',
    availableToday: false,
    nextAvailable: 'Next available: Wednesday',
    rating: 4.8
  },
  {
    id: '25',
    name: 'Dr. Amita Patel',
    specialty: 'Nephrologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/53.jpg',
    hospital: 'Renal Care Specialists',
    distance: '3.2 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '26',
    name: 'Dr. Robert Harris',
    specialty: 'Urologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
    hospital: 'Urology Associates',
    distance: '2.6 miles',
    availableToday: true,
    rating: 4.5
  },
  {
    id: '27',
    name: 'Dr. Elena Rivera',
    specialty: 'Dermatologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/37.jpg',
    hospital: 'Dermatology Specialists',
    distance: '1.9 miles',
    availableToday: false,
    nextAvailable: 'Next available: Thursday',
    rating: 4.9
  },
  {
    id: '28',
    name: 'Dr. Aditya Verma',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://randomuser.me/api/portraits/men/97.jpg',
    hospital: 'Bone & Joint Specialists',
    distance: '0.7 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '29',
    name: 'Dr. Olivia Williams',
    specialty: 'Neurologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    hospital: 'Brain & Spine Center',
    distance: '2.8 miles',
    availableToday: false,
    nextAvailable: 'Next available: Monday',
    rating: 4.7
  },
  {
    id: '30',
    name: 'Dr. Christopher Lee',
    specialty: 'Pulmonologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/39.jpg',
    hospital: 'Respiratory Medicine Center',
    distance: '1.4 miles',
    availableToday: true,
    rating: 4.6
  }
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

const BookAppointmentPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');
  
  useEffect(() => {
    const foundDoctor = mockDoctors.find(d => d.id === doctorId);
    if (foundDoctor) {
      setDoctor(foundDoctor);
    }
  }, [doctorId]);
  
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    setSelectedTime(null);
  };
  
  const handleBookAppointment = () => {
    if (!selectedTime) {
      toast({
        title: "Please select a time slot",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Appointment Booked Successfully",
      description: `Your appointment with ${doctor?.name} on ${format(selectedDate, 'PPP')} at ${selectedTime} has been confirmed.`,
      variant: "default"
    });
    
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
      <div className="max-w-3xl mx-auto px-4 pb-20 pt-4">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name} 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-care-primary"
            />
            <div className="flex-1">
              <h2 className="font-bold text-xl md:text-2xl text-care-dark">{doctor.name}</h2>
              <p className="text-care-muted text-sm md:text-base">{doctor.specialty}</p>
              <p className="text-sm text-care-muted">{doctor.hospital}</p>
              {doctor.availableToday && (
                <span className="inline-block mt-2 text-sm text-care-success bg-green-50 px-2 py-1 rounded">
                  Available today
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-care-primary" />
                Select Date
              </h3>
              
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
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
                        className={`p-3 rounded-lg text-center transition-colors ${
                          isSelected 
                            ? 'bg-care-primary text-white' 
                            : 'bg-gray-50 hover:bg-gray-100'
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
            
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-care-primary" />
                Select Time
              </h3>
              
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedTime === time 
                          ? 'bg-care-primary text-white' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <h3 className="text-lg font-bold mb-3">Reason for Visit</h3>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or reason for the appointment..."
                className="w-full p-4 bg-white rounded-xl border border-gray-200 focus:border-care-primary focus:ring-1 focus:ring-care-primary focus:outline-none h-32 resize-none"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold mb-4">Appointment Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-care-muted">Date:</span>
                  <span className="font-medium">{format(selectedDate, 'PPP')}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-care-muted">Time:</span>
                  <span className="font-medium">{selectedTime || 'Not selected'}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-care-muted">Doctor:</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-care-muted">Location:</span>
                  <span className="font-medium">{doctor.hospital}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleBookAppointment}
              className="w-full primary-button flex items-center justify-center py-4 transition-transform active:scale-[0.98]"
            >
              <CheckIcon className="mr-2 h-5 w-5" />
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookAppointmentPage;
