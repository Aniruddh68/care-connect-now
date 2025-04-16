
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FilterChips from './FilterChips';

interface FilterButtonProps {
  specialties: Array<{ id: string; label: string; }>;
  selectedSpecialties: string[];
  onSpecialtiesChange: (selected: string[]) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  specialties,
  selectedSpecialties,
  onSpecialtiesChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2 text-sm">Specialty</h4>
            <FilterChips
              options={specialties}
              selectedOptionIds={selectedSpecialties}
              onChange={onSpecialtiesChange}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
