import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Searchbar from '@/components/common/Searchbar';
import DoctorCard from '@/components/common/DoctorCard';
import { Separator } from '@/components/ui/separator';
import { SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDoctorStore } from '@/services/doctorService';

const specializations = [
  { id: 'all', label: 'All Specializations' },
  { id: 'dermatologist', label: 'Dermatologist' },
  { id: 'neurologist', label: 'Neurologist' },
  { id: 'nephrologist', label: 'Nephrologist' },
  { id: 'cardiologist', label: 'Cardiologist' },
  { id: 'pediatrician', label: 'Pediatrician' },
  { id: 'general', label: 'General Physician' },
  { id: 'orthopedic', label: 'Orthopedic' },
  { id: 'pulmonologist', label: 'Pulmonologist' },
  { id: 'gastroenterologist', label: 'Gastroenterologist' },
  { id: 'ophthalmologist', label: 'Ophthalmologist' },
  { id: 'endocrinologist', label: 'Endocrinologist' },
  { id: 'psychiatrist', label: 'Psychiatrist' },
];

const availability = [
  { id: 'any', label: 'Any Time' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'week', label: 'This Week' },
];

const FindDoctorPage: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('any');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  const { getActiveDoctors } = useDoctorStore();
  const activeDoctors = getActiveDoctors();
  
  const filteredDoctors = activeDoctors.filter(doctor => {
    // Filter by specialization
    if (selectedSpecialization !== 'all') {
      const spec = specializations.find(s => s.id === selectedSpecialization);
      if (spec && !doctor.specialty.toLowerCase().includes(spec.label.toLowerCase())) {
        return false;
      }
    }

    // Filter by availability
    if (selectedAvailability === 'today') {
      if (!doctor.availableToday) return false;
    } else if (selectedAvailability === 'tomorrow') {
      if (doctor.availableToday) return false; // Available today, not tomorrow
      if (!doctor.nextAvailable?.toLowerCase().includes('tomorrow')) return false;
    } else if (selectedAvailability === 'week') {
      // Show doctors available this week (today, tomorrow, or within the week)
      const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const isThisWeek = doctor.availableToday || 
        doctor.nextAvailable?.toLowerCase().includes('tomorrow') ||
        weekDays.some(day => doctor.nextAvailable?.toLowerCase().includes(day));
      if (!isThisWeek) return false;
    }

    // Filter by search query
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

  const handleClearFilters = () => {
    setSelectedSpecialization('all');
    setSelectedAvailability('any');
    setSearchQuery('');
  };
  
  return (
    <MainLayout title="Find a Doctor in Bhopal">
      <div className="max-w-7xl mx-auto px-4 pb-20 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block bg-card rounded-lg shadow-sm p-6 h-fit sticky top-20 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Filter Doctors</h3>
              <button 
                onClick={handleClearFilters}
                className="text-primary text-sm hover:underline"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2 text-foreground">Specialization</h4>
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map(spec => (
                      <SelectItem key={spec.id} value={spec.id}>
                        {spec.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2 text-foreground">Availability</h4>
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availability.map(avail => (
                      <SelectItem key={avail.id} value={avail.id}>
                        {avail.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            <div className="sticky top-16 bg-background pt-2 pb-4 z-10">
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <Searchbar 
                    onSearch={handleSearch} 
                    placeholder="Search by doctor name, specialty, or hospital..." 
                  />
                </div>
                
                {/* Mobile Filter Button */}
                {isMobile && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-card hover:bg-muted"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                      <SheetHeader className="mb-6">
                        <SheetTitle>Filter Doctors</SheetTitle>
                        <SheetDescription>
                          Find doctors by specialization
                        </SheetDescription>
                      </SheetHeader>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Specialization</h4>
                          <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              {specializations.map(spec => (
                                <SelectItem key={spec.id} value={spec.id}>
                                  {spec.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Availability</h4>
                          <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              {availability.map(avail => (
                                <SelectItem key={avail.id} value={avail.id}>
                                  {avail.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={handleClearFilters}
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
              
              {/* Quick Filter Chips for Mobile */}
              {isMobile && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger className="w-auto min-w-[160px] h-8 text-sm">
                      <SelectValue placeholder="Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map(spec => (
                        <SelectItem key={spec.id} value={spec.id}>
                          {spec.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            {/* Doctors List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  {filteredDoctors.length} Doctor{filteredDoctors.length !== 1 ? 's' : ''} Found
                  {selectedSpecialization !== 'all' && (
                    <span className="text-primary ml-2">
                      - {specializations.find(s => s.id === selectedSpecialization)?.label}
                    </span>
                  )}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} showBookButton={true} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No doctors found matching your criteria.</p>
                    <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search terms.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
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
