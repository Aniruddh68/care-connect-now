
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Searchbar from '@/components/common/Searchbar';
import EmergencyButton from '@/components/common/EmergencyButton';
import DoctorCard, { Doctor } from '@/components/common/DoctorCard';
import FilterButton from '@/components/common/FilterButton';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

// Mock data
const specialties = [
  { id: 'all', label: 'All Specialties' },
  { id: 'cardio', label: 'Cardiology' },
  { id: 'derm', label: 'Dermatology' },
  { id: 'ortho', label: 'Orthopedics' },
  { id: 'neuro', label: 'Neurology' },
  { id: 'pedia', label: 'Pediatrics' },
  { id: 'gyna', label: 'Gynecology' },
];

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
  }
];

const HomePage: React.FC = () => {
  const [selectedSpecialties, setSelectedSpecialties] = React.useState<string[]>(['all']);
  
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Would handle search logic here
  };
  
  return (
    <MainLayout>
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6">
          <EmergencyButton className="w-full mb-6" />
          
          <div className="mb-4">
            <h2 className="text-lg font-bold text-care-dark">Find doctors in Bhopal</h2>
            <p className="text-care-muted text-sm">Discover the best healthcare professionals near you</p>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Searchbar onSearch={handleSearch} />
            </div>
            <FilterButton
              specialties={specialties}
              selectedSpecialties={selectedSpecialties}
              onSpecialtiesChange={setSelectedSpecialties}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-care-dark">Available Now in Bhopal</h2>
            <Link to="/find" className="text-care-primary font-medium text-sm">View All</Link>
          </div>
          
          {mockDoctors
            .filter(doctor => doctor.availableToday)
            .map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link 
            to="/nearby" 
            className="bg-white rounded-xl p-4 shadow text-center card-hover flex flex-col items-center justify-center"
          >
            <MapPinIcon className="h-8 w-8 text-care-primary mb-2" />
            <span className="font-medium">Hospitals in Bhopal</span>
          </Link>
          
          <Link 
            to="/appointments" 
            className="bg-white rounded-xl p-4 shadow text-center card-hover flex flex-col items-center justify-center"
          >
            <CalendarIcon className="h-8 w-8 text-care-primary mb-2" />
            <span className="font-medium">My Appointments</span>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
