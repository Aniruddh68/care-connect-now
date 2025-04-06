
import React from 'react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedOptionIds: string[];
  onChange: (selectedIds: string[]) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ 
  options, 
  selectedOptionIds, 
  onChange 
}) => {
  const toggleOption = (optionId: string) => {
    if (selectedOptionIds.includes(optionId)) {
      onChange(selectedOptionIds.filter(id => id !== optionId));
    } else {
      onChange([...selectedOptionIds, optionId]);
    }
  };
  
  return (
    <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => toggleOption(option.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
            selectedOptionIds.includes(option.id)
              ? "bg-care-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
