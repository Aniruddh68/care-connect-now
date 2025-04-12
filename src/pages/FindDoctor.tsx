
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Searchbar from '@/components/common/Searchbar';
import DoctorCard, { Doctor } from '@/components/common/DoctorCard';
import FilterChips from '@/components/common/FilterChips';

// Mock data
const specialties = [
  { id: 'all', label: 'All Specialties' },
  { id: 'cardio', label: 'Cardiology' },
  { id: 'derm', label: 'Dermatology' },
  { id: 'ortho', label: 'Orthopedics' },
  { id: 'neuro', label: 'Neurology' },
  { id: 'pedia', label: 'Pediatrics' },
  { id: 'gyna', label: 'Gynecology' },
  { id: 'psych', label: 'Psychiatry' },
  { id: 'pulmo', label: 'Pulmonology' },
  { id: 'gastro', label: 'Gastroenterology' },
];

const availability = [
  { id: 'any', label: 'Any Time' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'week', label: 'This Week' },
];

const distance = [
  { id: 'any', label: 'Any Distance' },
  { id: 'near', label: '< 2 miles' },
  { id: 'medium', label: '< 5 miles' },
  { id: 'far', label: '< 10 miles' },
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
  }
];

const FindDoctorPage: React.FC = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['all']);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(['any']);
  const [selectedDistance, setSelectedDistance] = useState<string[]>(['any']);
  
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Would integrate with backend search
  };
  
  return (
    <MainLayout title="Find a Doctor in Bhopal">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6 sticky top-16 bg-care-background pt-2 pb-2 z-10">
          <Searchbar onSearch={handleSearch} placeholder="Search for doctors in Bhopal..." />
          
          <div className="mt-4">
            <h3 className="text-sm text-care-muted mb-1">Specialty</h3>
            <FilterChips 
              options={specialties}
              selectedOptionIds={selectedSpecialties}
              onChange={setSelectedSpecialties}
            />
          </div>
          
          <div className="mt-2">
            <h3 className="text-sm text-care-muted mb-1">Availability</h3>
            <FilterChips 
              options={availability}
              selectedOptionIds={selectedAvailability}
              onChange={setSelectedAvailability}
            />
          </div>
          
          <div className="mt-2">
            <h3 className="text-sm text-care-muted mb-1">Distance</h3>
            <FilterChips 
              options={distance}
              selectedOptionIds={selectedDistance}
              onChange={setSelectedDistance}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-care-dark">
              {mockDoctors.length} Doctors Found in Bhopal
            </h2>
          </div>
          
          {mockDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default FindDoctorPage;
