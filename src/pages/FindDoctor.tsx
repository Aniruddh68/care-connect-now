
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
    hospital: 'City Medical Center',
    distance: '1.2 miles',
    availableToday: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    hospital: 'General Hospital',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Dr. Rebecca Martinez',
    specialty: 'Pediatrician',
    imageUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
    hospital: 'Children\'s Hospital',
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
    hospital: 'University Hospital',
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
    hospital: 'Skin & Care Clinic',
    distance: '1.7 miles',
    availableToday: true,
    rating: 4.9
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
    <MainLayout title="Find a Doctor">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6 sticky top-16 bg-care-background pt-2 pb-2 z-10">
          <Searchbar onSearch={handleSearch} />
          
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
              {mockDoctors.length} Doctors Found
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
