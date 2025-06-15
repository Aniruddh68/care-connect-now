
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Searchbar from '@/components/common/Searchbar';
import DoctorCard from '@/components/common/DoctorCard';
import FilterButton from '@/components/common/FilterButton';
import FilterChips from '@/components/common/FilterChips';
import { Separator } from '@/components/ui/separator';
import { Filter, SlidersHorizontal, Heart, Brain, Droplets, Stethoscope, Baby, Eye, Syringe, Wind, CircleDot, Users, Bone, Activity } from 'lucide-react';
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
import { useDoctorStore } from '@/services/doctorService';

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

const specialtyCategories = [
  { id: 'dermatologist', label: 'Dermatologist', icon: Activity, color: 'bg-pink-100 text-pink-600' },
  { id: 'neurologist', label: 'Neurologist', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { id: 'nephrologist', label: 'Nephrologist', icon: Droplets, color: 'bg-red-100 text-red-600' },
  { id: 'cardiologist', label: 'Cardiologist', icon: Heart, color: 'bg-red-100 text-red-600' },
  { id: 'pediatrician', label: 'Pediatrician', icon: Baby, color: 'bg-orange-100 text-orange-600' },
  { id: 'general', label: 'General Physician', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
  { id: 'orthopedic', label: 'Orthopedician', icon: Bone, color: 'bg-green-100 text-green-600' },
  { id: 'pulmonologist', label: 'Pulmonologist', icon: Wind, color: 'bg-teal-100 text-teal-600' },
  { id: 'gastroenterologist', label: 'Gastroenterologist', icon: CircleDot, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'ophthalmologist', label: 'Ophthalmologist', icon: Eye, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'endocrinologist', label: 'Endocrinologist', icon: Syringe, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'psychiatrist', label: 'Psychiatrist', icon: Brain, color: 'bg-violet-100 text-violet-600' },
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

const FindDoctorPage: React.FC = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['all']);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(['any']);
  const [selectedDistance, setSelectedDistance] = useState<string[]>(['any']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDoctorList, setShowDoctorList] = useState(false);
  const isMobile = useIsMobile();
  
  // Use the centralized doctor store
  const { getActiveDoctors } = useDoctorStore();
  const activeDoctors = getActiveDoctors();
  
  const filteredDoctors = activeDoctors.filter(doctor => {
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
    if (query.trim()) {
      setShowDoctorList(true);
    }
  };

  const handleSpecialtyClick = (specialtyId: string) => {
    const specialty = specialtyCategories.find(s => s.id === specialtyId);
    if (specialty) {
      setSearchQuery(specialty.label);
      setSelectedSpecialties([specialtyId]);
      setShowDoctorList(true);
    }
  };
  
  return (
    <MainLayout title="Find a Doctor in Bhopal">
      <div className="max-w-7xl mx-auto px-4 pb-20 pt-4">
        {!showDoctorList ? (
          // Specialty Grid View
          <div className="space-y-6">
            <div className="sticky top-16 bg-care-background pt-2 pb-4 z-10">
              <Searchbar 
                onSearch={handleSearch} 
                placeholder="Search by Dr Name" 
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-care-dark mb-4">Search by Specialty</h2>
              <div className="grid grid-cols-3 gap-4">
                {specialtyCategories.map((specialty) => {
                  const IconComponent = specialty.icon;
                  return (
                    <button
                      key={specialty.id}
                      onClick={() => handleSpecialtyClick(specialty.id)}
                      className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className={`p-3 rounded-full ${specialty.color} mb-3`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                        {specialty.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // Doctor List View
          <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
            <aside className="hidden lg:block bg-white rounded-lg shadow-sm p-6 h-fit sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filter Doctors</h3>
                <button 
                  onClick={() => setShowDoctorList(false)}
                  className="text-care-primary text-sm hover:underline"
                >
                  Back to Categories
                </button>
              </div>
              
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
                  
                  <button 
                    onClick={() => setShowDoctorList(false)}
                    className="px-4 py-2 text-care-primary bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Categories
                  </button>
                  
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
        )}
      </div>
    </MainLayout>
  );
};

export default FindDoctorPage;
