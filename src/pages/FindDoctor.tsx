
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
import { useIsMobile } from '@/hooks/use-mobile';

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
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
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
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
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
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
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
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
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

const FindDoctorPage: React.FC = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['all']);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(['any']);
  const [selectedDistance, setSelectedDistance] = useState<string[]>(['any']);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
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
      <div className="max-w-7xl mx-auto px-4 pb-20 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
          <aside className="hidden lg:block bg-white rounded-lg shadow-sm p-6 h-fit sticky top-20">
            <h3 className="font-semibold mb-4">Filter Doctors</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Specialty</h4>
                <div className="flex flex-wrap gap-2">
                  <FilterChips 
                    options={specialties}
                    selectedOptionIds={selectedSpecialties}
                    onChange={setSelectedSpecialties}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Availability</h4>
                <div className="flex flex-wrap gap-2">
                  <FilterChips 
                    options={availability}
                    selectedOptionIds={selectedAvailability}
                    onChange={setSelectedAvailability}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Distance</h4>
                <div className="flex flex-wrap gap-2">
                  <FilterChips 
                    options={distance}
                    selectedOptionIds={selectedDistance}
                    onChange={setSelectedDistance}
                  />
                </div>
              </div>
            </div>
          </aside>

          <main>
            <div className="sticky top-16 bg-care-background pt-2 pb-2 z-10 mb-6">
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <Searchbar 
                    onSearch={handleSearch} 
                    placeholder="Search for doctors in Bhopal..." 
                  />
                </div>
                
                {isMobile && (
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
                    <SheetContent side="left" className="w-[300px]">
                      <SheetHeader className="mb-6">
                        <SheetTitle>Filter Doctors</SheetTitle>
                        <SheetDescription>
                          Customize your search results
                        </SheetDescription>
                      </SheetHeader>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Specialty</h4>
                          <div className="flex flex-wrap gap-2">
                            <FilterChips 
                              options={specialties}
                              selectedOptionIds={selectedSpecialties}
                              onChange={setSelectedSpecialties}
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Availability</h4>
                          <div className="flex flex-wrap gap-2">
                            <FilterChips 
                              options={availability}
                              selectedOptionIds={selectedAvailability}
                              onChange={setSelectedAvailability}
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Distance</h4>
                          <div className="flex flex-wrap gap-2">
                            <FilterChips 
                              options={distance}
                              selectedOptionIds={selectedDistance}
                              onChange={setSelectedDistance}
                            />
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-care-muted">No doctors found matching your criteria.</p>
                    <p className="text-care-muted text-sm mt-2">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default FindDoctorPage;
