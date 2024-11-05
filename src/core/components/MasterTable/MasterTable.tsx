import './MasterTable.scss';
import { useCallback, useEffect, useState } from 'react';
import { useFilterContext } from '../../contexts/FilterContext';
import { DataEntry } from './types';
import { useTableContext } from '../../contexts/TableContext';
import MasterTableRow from './MasterTableRow/MasterTableRow';
import MasterTableFilters from './MasterTableFilters/MasterTableFilters';
import { useTranslation } from 'react-i18next';
import Button from '../GenericButton/Button';
import classNames from 'classnames';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import RefreshIcon from '../../../svgs/refresh.svg?react';
import { replaceWhiteSpace } from '../../utils/utils';

const zebraEmoji = '🦓';

const MasterTable = ({index, tableName}: {index?: number, tableName: string;}) => {
  const [filteredData, setFilteredData] = useState<DataEntry[]>([]);
  const { t } = useTranslation();
  const {
    isLoading: isParentRowsLoading,
    tableData,
    columnData,
    fetchTableData,
    toggleStyle,
    isZebraStyle,
  } = useTableContext();
  const { filters, resetFilters } = useFilterContext();

  useEffect(() => {
    fetchTableData?.();
  }, [fetchTableData]);

  // Filter table data
  useEffect(() => {
    if (tableData.length && filters) {
      const filteredData = tableData.filter((entry) => {
        return Object.keys(filters).every((dimension) => {
          const selectedValues = filters[dimension];
          return (
            selectedValues.length === 0 ||
            selectedValues.includes(entry[replaceWhiteSpace(dimension) as keyof DataEntry] as string)
          );
        });
      });
      setFilteredData(filteredData);
    }
  }, [tableData, filters]);

  const reloadAndReset = useCallback(() => {
    fetchTableData?.();
    resetFilters?.();
  }, [fetchTableData, resetFilters]);

  return (
    <div className='master-table-wrapper'>
      <div className='master-table-top-info'>
        <h2 className='master-table-name'>{tableName ?? t('master-table.default-title')}</h2>
        <RefreshIcon
          role='button'
          className='header-refresh-icon'
          onClick={reloadAndReset}
          title={t('table.reload')}/>
      </div>
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
                    {columnData?.map((column, i) => (
                      <th key={`${column}-${i}`}>
                        {column}
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
