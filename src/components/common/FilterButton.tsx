
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FilterChips from './FilterChips';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  selectedIds: string[];
  onChange: (selected: string[]) => void;
}

interface FilterButtonProps {
  sections?: FilterSection[];
  specialties?: Array<{ id: string; label: string; }>;
  selectedSpecialties?: string[];
  onSpecialtiesChange?: (selected: string[]) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  sections,
  specialties,
  selectedSpecialties,
  onSpecialtiesChange,
}) => {
  // If sections are provided, use them; otherwise, create a single specialty section
  const filterSections = sections || (specialties && selectedSpecialties && onSpecialtiesChange ? [
    {
      title: "Specialty",
      options: specialties,
      selectedIds: selectedSpecialties,
      onChange: onSpecialtiesChange
    }
  ] : []);

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
          {filterSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-medium mb-2 text-sm">{section.title}</h4>
              <FilterChips
                options={section.options}
                selectedOptionIds={section.selectedIds}
                onChange={section.onChange}
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
