import './MasterTable.scss';
import { useEffect, useState } from 'react';
import { useFilterContext } from '../../contexts/FilterContext';
import { DataEntry } from './types';
import { useTableContext } from '../../contexts/TableContext';
import MasterTableRow from './MasterTableRow/MasterTableRow';
import MasterTableFilters from './MasterTableFilters/MasterTableFilters';
import { useTranslation } from 'react-i18next';
import Button from '../GenericButton/Button';
import classNames from 'classnames';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

const zebraEmoji = '🦓';

const MasterTable = ({index, tableName}: {index?: number, tableName: string;}) => {
  const [filteredData, setFilteredData] = useState<DataEntry[]>([]);

  console.log('🚀 ~ MasterTable ~ filteredData:', filteredData);
  const { t } = useTranslation();
  const {
    isLoading: isParentRowsLoading,
    tableData,
    columnData,
    fetchTableData,
    toggleStyle,
    isZebraStyle,
  } = useTableContext();
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

  return (
    <div className='master-table-wrapper'>
      <h2 className='master-table-name'>{tableName ?? t('master-table.default-title')}</h2>
      <MasterTableFilters/>
      {
        isParentRowsLoading ? (
          <div className='loading-wrapper'>
            <LoaderSpinner/>
          </div>
        ) : (
          <div className='master-table-container'>
            <div className='main-content'>
              <Button
                className='master-table-style-switch'
                title='Switch Table Style'
                label={zebraEmoji}
                onClick={toggleStyle}
                isInverse={!isZebraStyle}/>
              <table className={classNames(
                'master-table',
                `table-${index}`,
                {['zebra-style']: isZebraStyle},
              )}>
                <thead>
                  <tr>
                    {columnData?.map((column, i, arr) => (
                      <th key={`${column}-${i}`}>
                        {column}
                        {i === arr.length -1 && (
                          <button onClick={fetchTableData}>reload</button>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry) => (
                    <MasterTableRow key={entry.id} entry={entry} />
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length === 0 && (<span className='no-data'>{t('master-table.no-data')}</span>)}
          </div>
        )
      }
    </div>
  );
};

export default MasterTable;
