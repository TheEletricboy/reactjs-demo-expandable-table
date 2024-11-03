import './MasterTable.scss';
import { useEffect, useState } from 'react';
import { useFilterContext } from '../../contexts/FilterContext';
import { DataEntry } from './types';
import { useTableContext } from '../../contexts/TableContext';
import MasterTableRow from './MasterTableRow/MasterTableRow';
import MasterTableFilters from './MasterTableFilters/MasterTableFilters';
import { FilterSummary } from '../FilterSummary/FilterSummary';
import { useTranslation } from 'react-i18next';

const MasterTable = ({index}: {index?: number}) => {
  const [filteredData, setFilteredData] = useState<DataEntry[]>([]);
  const { isLoading: isParentRowsLoading, tableData, columnData } = useTableContext();
  const { t } = useTranslation();

  const { filters } = useFilterContext();

  // Filter table data
  useEffect(() => {
    if (tableData.length && filters) {
      console.log("----APPLYING FILTERS");
      const filteredData = tableData.filter((entry) => {
        return Object.keys(filters).every((dimension) => {
          const selectedValues = filters[dimension];
          return (
            selectedValues.length === 0 || selectedValues.includes(entry[dimension])
          );
        });
      });
      setFilteredData(filteredData);
    }
  }, [tableData, filters]);

  if (isParentRowsLoading) {
    return <div>{`${t('generic.loading')}...`}</div>;
  }

  if (filteredData.length === 0) {
    return <div>{t('master-table.no-data')}</div>;
  }

  return (
    <>
      <h2>{t('master-table.filters')}</h2>
      <MasterTableFilters/>
      <h2>{t('master-table.default-title')}</h2>
      <FilterSummary />
      <table className={`table-${index}`}>
        <thead>
          <tr>
            {columnData?.map((column, i) => (<th key={`${column}-${i}`}>{column}</th>))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry) => (
            <MasterTableRow key={entry.id} entry={entry} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MasterTable;
