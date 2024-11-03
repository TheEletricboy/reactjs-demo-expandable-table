import React, { useState, useEffect, useCallback } from 'react';
import { useFilterContext } from '../../../contexts/FilterContext';
import { getUniqueFilterOptions } from '../../../api/dataService';
import { useTableContext } from '../../../contexts/TableContext';
import Button from '../../GenericButton/Button';
import './MasterTableFilters.scss';

const defaultLocalFilters = {};

const MasterTableFilters: React.FC = () => {
  const { setFilters } = useFilterContext();
  const { tableData, columnData, isLoading } = useTableContext();

  const [filterOptions, setFilterOptions] = useState<{ [key: string]: string[] }>(defaultLocalFilters);
  const [localFilters, setLocalFilters] = useState<{ [key: string]: string[] }>(defaultLocalFilters);

  useEffect(() => {
    // Fetch unique filter options for each dimension from parent data
    const options = getUniqueFilterOptions(columnData, tableData);
    setFilterOptions(options);
  }, [columnData, tableData]);

  const handleChange = (dimension: string, selectedIds: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      [dimension]: selectedIds,
    }));
  };

  const handleSubmit = useCallback(() => (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FILTERS: ', JSON.stringify(localFilters));
    setFilters(localFilters);
  },[localFilters, setFilters]);

  const handleReset = useCallback(() =>() => {
    setLocalFilters(defaultLocalFilters);
    setFilters(defaultLocalFilters);
  }, [setFilters]);

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
      <Button
        onClick={handleReset}
        disabled={isLoading}
        style={{ marginLeft: '10px', backgroundColor: 'blue', color: 'white' }} label='reset'/>
    </form>
  );
};

export default MasterTableFilters;
