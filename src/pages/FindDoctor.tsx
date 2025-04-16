import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Searchbar from '@/components/common/Searchbar';
import DoctorCard, { Doctor } from '@/components/common/DoctorCard';
import FilterButton from '@/components/common/FilterButton';
import FilterChips from '@/components/common/FilterChips';
import { Separator } from '@/components/ui/separator';
import { Filter, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

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
  { id: 'ophthal', label: 'Ophthalmology' },
  { id: 'endo', label: 'Endocrinology' },
  { id: 'uro', label: 'Urology' },
  { id: 'nephro', label: 'Nephrology' },
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

const FindDoctorPage: React.FC = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['all']);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(['any']);
  const [selectedDistance, setSelectedDistance] = useState<string[]>(['any']);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDoctors = mockDoctors.filter(doctor => {
    if (!selectedSpecialties.includes('all') && 
        !selectedSpecialties.some(s => doctor.specialty.toLowerCase().includes(s))) {
      return false;
    }
    
    if (selectedAvailability.includes('today') && !doctor.availableToday) {
      return false;
    }
    
    if (searchQuery && 
        !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <MainLayout title="Find a Doctor in Bhopal">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6 sticky top-16 bg-care-background pt-2 pb-2 z-10">
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <Searchbar 
                onSearch={handleSearch} 
                placeholder="Search for doctors in Bhopal..." 
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Doctors</SheetTitle>
                  <SheetDescription>
                    Customize your search results with these filters
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Specialty</h3>
                    <FilterChips 
                      options={specialties}
                      selectedOptionIds={selectedSpecialties}
                      onChange={setSelectedSpecialties}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Availability</h3>
                    <FilterChips 
                      options={availability}
                      selectedOptionIds={selectedAvailability}
                      onChange={setSelectedAvailability}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Distance</h3>
                    <FilterChips 
                      options={distance}
                      selectedOptionIds={selectedDistance}
                      onChange={setSelectedDistance}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-2">
              <FilterChips 
                options={specialties}
                selectedOptionIds={selectedSpecialties}
                onChange={setSelectedSpecialties}
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-care-dark">
              {filteredDoctors.length} Doctors Found in Bhopal
            </h2>
          </div>
          
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-care-muted">No doctors found matching your criteria.</p>
              <p className="text-care-muted text-sm mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FindDoctorPage;
