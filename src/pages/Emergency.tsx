
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { MapPinIcon, Clock, Phone } from 'lucide-react';
import DoctorCard, { Doctor } from '@/components/common/DoctorCard';

// Mock data
const mockEmergencyDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Emergency Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    hospital: 'City Medical Center',
    distance: '1.2 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Emergency Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    hospital: 'General Hospital',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.7
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
    alert('This would call emergency services (911/112/etc)');
  };
  
  return (
    <MainLayout hideNav title="Emergency Care">
      <div className="max-w-lg mx-auto px-4 pb-6 pt-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-red-700 mb-2">Emergency Information</h2>
          <p className="text-red-700 mb-4">
            If this is a life-threatening emergency, please call emergency services immediately.
          </p>
          <button 
            onClick={handleCallEmergency}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Emergency Services
          </button>
        </div>
        
        <h2 className="text-xl font-bold text-care-dark mb-4">Nearest Emergency Care</h2>
        
        {isLoading ? (
          <div className="bg-white rounded-xl shadow p-6 mb-4 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-20 w-20 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-slate-200 rounded w-1/2"></div>
            </div>
            <p className="mt-4 text-care-muted">Locating nearest emergency care...</p>
          </div>
        ) : nearestDoctor ? (
          <div className="mb-6">
            <DoctorCard doctor={nearestDoctor} showBookButton={false} />
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => alert('This would open maps navigation')}
                className="flex-1 primary-button flex items-center justify-center"
              >
                <MapPinIcon className="mr-2 h-5 w-5" />
                Navigate
              </button>
              <button 
                onClick={() => alert('This would call the doctor')}
                className="flex-1 secondary-button flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 mb-4 text-center">
            <p className="text-care-muted">No emergency providers found nearby.</p>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-lg font-bold text-care-dark mb-3">Other Emergency Options</h3>
          {mockEmergencyDoctors.filter(d => d.id !== nearestDoctor?.id).map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} showBookButton={false} />
          ))}
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
