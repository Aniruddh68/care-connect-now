
import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

interface SearchbarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Searchbar: React.FC<SearchbarProps> = ({ 
  onSearch,
  placeholder = "Search for doctors, specialties..." 
}) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3 pl-12 pr-4 bg-white rounded-xl border border-gray-200 focus:border-care-primary focus:ring-1 focus:ring-care-primary focus:outline-none"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <button type="submit" className="sr-only">Search</button>
    </form>
  );
};

export default Searchbar;
