import './MasterTableFilters.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { useFilterContext } from '../../../contexts/FilterContext';
import { getUniqueFilterOptions } from '../../../api/dataService';
import { useTableContext } from '../../../contexts/TableContext';
import Button from '../../GenericButton/Button';
import { useTranslation } from 'react-i18next';
import FilterSummary from '../../FilterSummary/FilterSummary';
import TableFilter from './TableFilter/TableFilter';

const defaultLocalFilters = {};

export type TTableFilterOptions = { [key: string]: string[] };

const MasterTableFilters: React.FC = () => {
  const { t } = useTranslation();
  const { setFilters } = useFilterContext();
  const { tableData, columnData, isLoading } = useTableContext();

  const [filterOptions, setFilterOptions] = useState<TTableFilterOptions>(defaultLocalFilters);
  const [localFilters, setLocalFilters] = useState<TTableFilterOptions>(defaultLocalFilters);

  useEffect(() => {
    const options = getUniqueFilterOptions(columnData, tableData);
    setFilterOptions(options);
  }, [columnData, tableData]);

  const handleChange = useCallback((dimension: string, selectedIds: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      [dimension]: selectedIds,
    }));
  }, [setLocalFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(localFilters);
  };

  const handleReset = useCallback(() => {
    setLocalFilters(defaultLocalFilters);
    setFilters(defaultLocalFilters);
  }, [setFilters]);

  return (
    <div className='main-filters-wrapper'>
      <div className='filters-form-container'>
        <form onSubmit={handleSubmit} className='main-filters'>
          {Object.keys(filterOptions).map((dimension, i) => (
            <TableFilter
              key={`${dimension}-${i}`}
              label={dimension}
              localFilters={localFilters}
              handleChange={handleChange}
              options={filterOptions}
              dimension={dimension}/>
          ))}
          <button type="submit">{t('table.apply-filters')}</button>
          <Button
            onClick={handleReset}
            disabled={isLoading}
            style={{ marginLeft: '10px', backgroundColor: 'blue', color: 'white' }}
            label={t('table.reset-filters')}
          />
        </form>
      </div>
      <FilterSummary />
    </div>
  );
};

export default MasterTableFilters;
