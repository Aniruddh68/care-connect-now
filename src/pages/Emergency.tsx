
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { MapPinIcon, Clock, Phone, Stethoscope, Heart, Ambulance } from 'lucide-react';
import DoctorCard, { Doctor } from '@/components/common/DoctorCard';

// Mock data with updated doctor names
const mockEmergencyDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Emergency Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    hospital: 'Bhopal Medical Center',
    distance: '1.2 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    specialty: 'Emergency Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Dr. Anil Kumar',
    specialty: 'Trauma Surgery',
    imageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
    hospital: 'Gandhi Medical College',
    distance: '1.5 miles',
    availableToday: true,
    rating: 4.9
  },
  {
    id: '4',
    name: 'Dr. Neha Verma',
    specialty: 'Critical Care',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    hospital: 'Hamidia Hospital',
    distance: '2.3 miles',
    availableToday: true,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Dr. Suresh Reddy',
    specialty: 'Pediatric Emergency',
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    hospital: 'Bhopal Children\'s Hospital',
    distance: '1.7 miles',
    availableToday: false,
    nextAvailable: 'Available tomorrow',
    rating: 4.8
  },
  {
    id: '6',
    name: 'Dr. Pooja Mehta',
    specialty: 'Cardiology Emergency',
    imageUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
    hospital: 'Heart Care Bhopal',
    distance: '3.1 miles',
    availableToday: true,
    rating: 4.9
  }
];

const EmergencyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [nearestDoctor, setNearestDoctor] = useState<Doctor | null>(null);
  
  // Simulate fetching nearest emergency doctors
  useEffect(() => {
    const timer = setTimeout(() => {
      setNearestDoctor(mockEmergencyDoctors[1]); // The closest one
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCallEmergency = () => {
    alert('This would call emergency services in Bhopal (108)');
  };
  
  return (
    <MainLayout hideNav title="Emergency Care in Bhopal">
      <div className="max-w-lg mx-auto px-4 pb-6 pt-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-red-700 mb-2">Emergency Information</h2>
          <p className="text-red-700 mb-4">
            If this is a life-threatening emergency in Bhopal, please call emergency services immediately.
          </p>
         <a
            href="tel:108"
              className="w-full py-3 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center"
>
              <Phone className="mr-2 h-5 w-5" />
                   Call Emergency Services (108)
              </a>
        </div>
        
        <h2 className="text-xl font-bold text-care-dark mb-4">Nearest Emergency Care in Bhopal</h2>
        
        {isLoading ? (
          <div className="bg-white rounded-xl shadow p-6 mb-4 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-20 w-20 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-slate-200 rounded w-1/2"></div>
            </div>
            <p className="mt-4 text-care-muted">Locating nearest emergency care in Bhopal...</p>
          </div>
        ) : nearestDoctor ? (
          <div className="mb-6">
            <DoctorCard doctor={nearestDoctor} showBookButton={false} />
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => alert('This would open maps navigation to the hospital in Bhopal')}
                className="flex-1 primary-button flex items-center justify-center"
              >
                <MapPinIcon className="mr-2 h-5 w-5" />
                Navigate
              </button>
              <button 
                onClick={() => alert('This would call the doctor in Bhopal')}
                className="flex-1 secondary-button flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 mb-4 text-center">
            <p className="text-care-muted">No emergency providers found nearby in Bhopal.</p>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-lg font-bold text-care-dark mb-3">All Emergency Doctors in Bhopal</h3>
          {mockEmergencyDoctors.filter(d => d.id !== nearestDoctor?.id).map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} showBookButton={false} />
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <div className="flex flex-col items-center">
              <Ambulance className="h-8 w-8 text-red-500 mb-2" />
              <span className="font-medium">Emergency Response Time</span>
              <span className="text-care-success">~10 minutes</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <div className="flex flex-col items-center">
              <Heart className="h-8 w-8 text-red-500 mb-2" />
              <span className="font-medium">Specialist Available</span>
              <span className="text-care-success">24/7</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-lg"
        >
          Return to Home
        </button>
      </div>
    </MainLayout>
  );
};

export default EmergencyPage;
