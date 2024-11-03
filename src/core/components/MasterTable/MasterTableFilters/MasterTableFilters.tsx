import React, { useState, useEffect } from 'react';
import { useFilterContext } from '../../../contexts/FilterContext';
import { getUniqueFilterOptions } from '../../../api/dataService';
import Button from '../../GenericButton/Button';
import './MasterTableFilters.scss';

const MasterTableFilters: React.FC = () => {
  const { setFilters } = useFilterContext();
  const [filterOptions, setFilterOptions] = useState<{ [key: string]: string[] }>({});
  const [localFilters, setLocalFilters] = useState<{ [key: string]: string[] }>({
    Article: [],
    Region: [],
    LegalEntity: [],
    Version: [],
    Currency: [],
    Measure: [],
  });

  useEffect(() => {
    // Fetch unique filter options for each dimension from parent data
    const options = getUniqueFilterOptions();
    setFilterOptions(options);
  }, []);

  const handleChange = (dimension: string, selectedIds: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      [dimension]: selectedIds,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FILTERS: ', JSON.stringify(localFilters));

    // Update the filters in context
    setFilters(localFilters);
  };

  const handleReset = () => {
    // Clear all selected filters
    const resetFilters = {
      Article: [],
      Region: [],
      LegalEntity: [],
      Version: [],
      Currency: [],
      Measure: [],
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className='main-filters' >
      {Object.keys(filterOptions).map((dimension) => (
        <div key={dimension} className='filter-option'>
          <label>{dimension}</label>
          <select
            multiple
            value={localFilters[dimension]}
            onChange={(e) => {
              const options = e.target.options;
              const selectedIds = [];
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                  selectedIds.push(options[i].value);
                }
              }
              handleChange(dimension, selectedIds);
            }}
          >
            {filterOptions[dimension].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit">Apply Filters</button>
      <Button onClick={handleReset} style={{ marginLeft: '10px', backgroundColor: 'blue', color: 'white' }} label='reset'/>
    </form>
  );
};

export default MasterTableFilters;
