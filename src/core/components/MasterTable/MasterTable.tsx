import './MasterTable.scss';
import { useCallback, useEffect, useState } from 'react';
import { useFilterContext } from '../../contexts/FilterContext';
import { DataEntry } from './types';
import { useTableContext } from '../../contexts/TableContext';
import MasterTableRow from './MasterTableRow/MasterTableRow';
import MasterTableFilters from './MasterTableFilters/MasterTableFilters';
import { FilterSummary } from '../FilterSummary/FilterSummary';
import { useTranslation } from 'react-i18next';
import Button from '../GenericButton/Button';
import classNames from 'classnames';

const MasterTable = ({index}: {index?: number}) => {
  const [filteredData, setFilteredData] = useState<DataEntry[]>([]);
  const [isTableStyleZebra, setTableStyleZebra] = useState(false);
  const { t } = useTranslation();
  const { isLoading: isParentRowsLoading, tableData, columnData, fetchTableData } = useTableContext();
  const { filters } = useFilterContext();

  useEffect(() => {
    fetchTableData && fetchTableData();
  }, [fetchTableData]);

  // Filter table data
  useEffect(() => {
    if (tableData.length && filters) {
      console.log("----APPLYING FILTERS");
      const filteredData = tableData.filter((entry) => {
        return Object.keys(filters).every((dimension) => {
          const selectedValues = filters[dimension];
          return (
            selectedValues.length === 0 ||
            selectedValues.includes(entry[dimension as keyof DataEntry] as string)
          );
        });
      });
      setFilteredData(filteredData);
    }
  }, [tableData, filters]);

  const handleChangeStyle = useCallback(() => setTableStyleZebra(prev => !prev), [setTableStyleZebra]);

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
      <div>
        <Button
          className='master-table-style-switch'
          title='Switch Table Style'
          label='Switch Table Style'
          onClick={handleChangeStyle}/>
        <table className={classNames(
          'master-table',
          `table-${index}`,
          {['zebra-style']: isTableStyleZebra},
        )}>
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
      </div>
    </>
  );
};

export default MasterTable;
