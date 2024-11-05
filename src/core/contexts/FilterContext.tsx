import React, { createContext, useContext, useMemo, useState } from 'react';
import { Filters } from '../components/MasterTable/types';

type FilterContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const defaultFilters = {};

export const FilterProvider= ({ children }: {children: React.ReactNode}) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const resetFilters = () => setFilters(defaultFilters);

  const value = useMemo(() => ({ filters, setFilters, resetFilters }), [filters]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
