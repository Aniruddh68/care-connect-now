import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar, Clock, CheckIcon, WalletCards } from 'lucide-react';
import { Doctor } from '@/components/common/DoctorCard';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { useAppointmentStore } from '@/services/appointmentService';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiologist',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    hospital: 'Bhopal Medical Center',
    distance: '1.2 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Dr. Anil Kumar',
    specialty: 'Pediatrician',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    hospital: 'Bhopal Children\'s Hospital',
    distance: '2.4 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tomorrow',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Dr. Neha Verma',
    specialty: 'Neurologist',
    imageUrl: 'https://images.unsplash.com/photo-1594824804732-ca8db7b2ca59?w=400&h=400&fit=crop&crop=face',
    hospital: 'Bhopal University Hospital',
    distance: '3.1 miles',
    availableToday: false,
    nextAvailable: 'Next available: Friday',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Dr. Suresh Reddy',
    specialty: 'Dermatologist',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    hospital: 'Bhopal Skin & Care Clinic',
    distance: '1.7 miles',
    availableToday: true,
    rating: 4.9
  },
  {
    id: '6',
    name: 'Dr. Pooja Mehta',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
    hospital: 'Digestive Health Center',
    distance: '2.2 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '7',
    name: 'Dr. Arvind Patel',
    specialty: 'Psychiatrist',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&crop=face',
    hospital: 'Mental Wellness Clinic',
    distance: '1.5 miles',
    availableToday: false,
    nextAvailable: 'Next available: Monday',
    rating: 4.8
  },
  {
    id: '8',
    name: 'Dr. Swati Joshi',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://images.unsplash.com/photo-1594998094574-27fcaadcb754?w=400&h=400&fit=crop&crop=face',
    hospital: 'Bhopal Eye Institute',
    distance: '3.5 miles',
    availableToday: true,
    rating: 4.6
  },
  {
    id: '9',
    name: 'Dr. Sanjay Deshmukh',
    specialty: 'Endocrinologist',
    imageUrl: 'https://images.unsplash.com/photo-1612349316228-583cd7cbb4c9?w=400&h=400&fit=crop&crop=face',
    hospital: 'Diabetes & Hormone Center',
    distance: '1.8 miles',
    availableToday: false,
    nextAvailable: 'Next available: Wednesday',
    rating: 4.9
  },
  {
    id: '10',
    name: 'Dr. Ananya Iyer',
    specialty: 'Pulmonologist',
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8b5dfb8f0c26?w=400&h=400&fit=crop&crop=face',
    hospital: 'Respiratory Care Hospital',
    distance: '2.7 miles',
    availableToday: true,
    rating: 4.5
  },
  {
    id: '11',
    name: 'Dr. Ramesh Bhatia',
    specialty: 'Urologist',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    hospital: 'Urology Specialists Center',
    distance: '1.9 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '12',
    name: 'Dr. Kavita Nair',
    specialty: 'Nephrologist',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    hospital: 'Kidney Care Institute',
    distance: '2.8 miles',
    availableToday: false,
    nextAvailable: 'Next available: Thursday',
    rating: 4.8
  },
  {
    id: '13',
    name: 'Dr. Ashok Gupta',
    specialty: 'Cardiologist',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    hospital: 'Heart & Vascular Institute',
    distance: '3.2 miles',
    availableToday: true,
    rating: 4.9
  },
  {
    id: '14',
    name: 'Dr. Sneha Rao',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://images.unsplash.com/photo-1594824804732-ca8db7b2ca59?w=400&h=400&fit=crop&crop=face',
    hospital: 'Joint & Spine Center',
    distance: '1.6 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tuesday',
    rating: 4.7
  },
  {
    id: '15',
    name: 'Dr. Manish Jain',
    specialty: 'Neurologist',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    hospital: 'Neuroscience Institute',
    distance: '2.5 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '16',
    name: 'Dr. Divya Kapoor',
    specialty: 'Dermatologist',
    imageUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
    hospital: 'Skin Health Center',
    distance: '0.9 miles',
    availableToday: true,
    rating: 4.6
  },
  {
    id: '17',
    name: 'Dr. Vinay Kulkarni',
    specialty: 'Endocrinologist',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&crop=face',
    hospital: 'Hormone & Metabolic Center',
    distance: '3.4 miles',
    availableToday: false,
    nextAvailable: 'Next available: Friday',
    rating: 4.7
  },
  {
    id: '18',
    name: 'Dr. Meena Chaudhary',
    specialty: 'Pulmonologist',
    imageUrl: 'https://images.unsplash.com/photo-1594998094574-27fcaadcb754?w=400&h=400&fit=crop&crop=face',
    hospital: 'Lung & Breathing Center',
    distance: '2.1 miles',
    availableToday: true,
    rating: 4.5
  },
  {
    id: '19',
    name: 'Dr. Ajay Malhotra',
    specialty: 'Pediatrician',
    imageUrl: 'https://images.unsplash.com/photo-1612349316228-583cd7cbb4c9?w=400&h=400&fit=crop&crop=face',
    hospital: 'Children\'s Wellness Center',
    distance: '1.3 miles',
    availableToday: true,
    rating: 4.9
  },
  {
    id: '20',
    name: 'Dr. Ritu Agarwal',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8b5dfb8f0c26?w=400&h=400&fit=crop&crop=face',
    hospital: 'GI Health Institute',
    distance: '2.9 miles',
    availableToday: false,
    nextAvailable: 'Next available: Next Tuesday',
    rating: 4.6
  },
  {
    id: '21',
    name: 'Dr. Vikram Sinha',
    specialty: 'Gynecologist',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    hospital: 'Women\'s Health Center',
    distance: '1.8 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '22',
    name: 'Dr. Aarti Menon',
    specialty: 'Cardiologist',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    hospital: 'Cardiac Care Hospital',
    distance: '3.7 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tomorrow',
    rating: 4.7
  },
  {
    id: '23',
    name: 'Dr. Deepak Joshi',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    hospital: 'Vision Care Center',
    distance: '2.3 miles',
    availableToday: true,
    rating: 4.6
  },
  {
    id: '24',
    name: 'Dr. Nidhi Saxena',
    specialty: 'Psychiatrist',
    imageUrl: 'https://images.unsplash.com/photo-1594824804732-ca8db7b2ca59?w=400&h=400&fit=crop&crop=face',
    hospital: 'Behavioral Health Institute',
    distance: '1.5 miles',
    availableToday: false,
    nextAvailable: 'Next available: Wednesday',
    rating: 4.8
  },
  {
    id: '25',
    name: 'Dr. Mohan Pillai',
    specialty: 'Nephrologist',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    hospital: 'Renal Care Specialists',
    distance: '3.2 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '26',
    name: 'Dr. Shruti Shah',
    specialty: 'Urologist',
    imageUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
    hospital: 'Urology Associates',
    distance: '2.6 miles',
    availableToday: true,
    rating: 4.5
  },
  {
    id: '27',
    name: 'Dr. Naveen D\'Souza',
    specialty: 'Dermatologist',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&crop=face',
    hospital: 'Dermatology Specialists',
    distance: '1.9 miles',
    availableToday: false,
    nextAvailable: 'Next available: Thursday',
    rating: 4.9
  },
  {
    id: '28',
    name: 'Dr. Harsha Bhattacharya',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://images.unsplash.com/photo-1594998094574-27fcaadcb754?w=400&h=400&fit=crop&crop=face',
    hospital: 'Bone & Joint Specialists',
    distance: '0.7 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '29',
    name: 'Dr. Karan Thakur',
    specialty: 'Neurologist',
    imageUrl: 'https://images.unsplash.com/photo-1612349316228-583cd7cbb4c9?w=400&h=400&fit=crop&crop=face',
    hospital: 'Brain & Spine Center',
    distance: '2.8 miles',
    availableToday: false,
    nextAvailable: 'Next available: Monday',
    rating: 4.7
  },
  {
    id: '30',
    name: 'Dr. Tanvi Chatterjee',
    specialty: 'Pulmonologist',
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8b5dfb8f0c26?w=400&h=400&fit=crop&crop=face',
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
  const { addAppointment } = useAppointmentStore();
  
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

    if (!doctor) return;
    
    addAppointment({
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorImage: doctor.imageUrl,
      hospital: doctor.hospital,
      date: selectedDate,
      time: selectedTime,
      status: 'upcoming',
      reason: reason.trim() || undefined
    });
    
    toast({
      title: "Appointment Booked Successfully",
      description: `Your appointment with ${doctor.name} on ${format(selectedDate, 'PPP')} at ${selectedTime} has been confirmed.`,
      variant: "default"
    });
    
    navigate('/appointments');
  };

  const handlePayment = () => {
    navigate('/payment');
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
              src={doctor?.imageUrl} 
              alt={doctor?.name} 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-care-primary"
            />
            <div className="flex-1">
              <h2 className="font-bold text-xl md:text-2xl text-care-dark">{doctor?.name}</h2>
              <p className="text-care-muted text-sm md:text-base">{doctor?.specialty}</p>
              <p className="text-sm text-care-muted">{doctor?.hospital}</p>
              {doctor?.availableToday && (
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
            
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4 md:gap-6">
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
                  <span className="font-medium">{doctor?.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-care-muted">Location:</span>
                  <span className="font-medium">{doctor?.hospital}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="w-full mt-3 bg-care-primary text-white flex items-center justify-center py-3 md:py-4 rounded-xl transition-transform active:scale-[0.98]"
                aria-label="Pay for Appointment"
              >
                <WalletCards className="mr-2 h-5 w-5" />
                Pay Now
              </button>
            </div>
            
            <button
              onClick={handleBookAppointment}
              className="w-full bg-care-primary text-white flex items-center justify-center py-4 rounded-xl transition-transform active:scale-[0.98]"
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
