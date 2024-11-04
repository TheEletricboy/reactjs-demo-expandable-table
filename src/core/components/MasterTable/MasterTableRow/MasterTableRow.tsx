import './MasterTableRow.scss';
import { memo, useCallback, useState } from 'react';
import { loadChildData } from '../../../api/dataService';
import { DataEntry } from '../types';
import { useTranslation } from 'react-i18next';
import GenericIcon from '../../GenericIcon/GenericIcon';
import classNames from 'classnames';

type MasterTableRowProps = {
  entry: DataEntry;
}

type TCuratedDataEntry = {
  entry: DataEntry;
  handleExpandClick?: () => void;
  shouldAddExpandButton?: boolean;
  isExpanded?: boolean;
  propertiesToIgnore?: string[];
};

const defaultPropsToIgnore = ['id'];

// Filters out certain properties + adds expandable button to first element + renders the rest.
const CuratedDataEntry = ({
  entry,
  handleExpandClick,
  shouldAddExpandButton = false,
  isExpanded,
  propertiesToIgnore = defaultPropsToIgnore,
}: TCuratedDataEntry) => (
  Object.keys(entry)
    .filter((key) => !propertiesToIgnore?.includes(key))
    .map((key, i) => {
      if (i === 0 && shouldAddExpandButton) {
        return (
          <td key={key} className='td-w-expand-btn' onClick={handleExpandClick}>
            <GenericIcon className={classNames(
              'expandable-icon',
              {['expanded']: isExpanded},
            )}/>
            {entry[key as keyof DataEntry]}
          </td>
        );
      };
      return (
        <td key={key} onClick={handleExpandClick}>{entry[key as keyof DataEntry]}</td>
      );
    }) || null
);

const MasterTableRow = ({ entry }: MasterTableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<DataEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleExpandClick = useCallback(async() => {
    setIsExpanded(prev => !prev);
    if (!isExpanded) {
      setIsLoading(true);
      // Load child data for the given parent ID
      await loadChildData(entry.id).then((childData) => {
        setChildren(childData);
        setIsLoading(false);
      });
    }
  }, [entry.id, isExpanded]);

  return (
    <>
      <tr className={classNames('parent-row', 'table-row')}>
        <CuratedDataEntry
          entry={entry}
          handleExpandClick={handleExpandClick}
          isExpanded={isExpanded}
          shouldAddExpandButton/>
      </tr>
      { isLoading && (
        <tr className={classNames('table-child', 'table-row')}>
          <td>{`${t('generic.loading')}...`}</td>
        </tr>
      )}
      {isExpanded && !isLoading && children.map((child) => (
        <tr className={classNames('table-child', 'table-row')} key={child.id}>
          <CuratedDataEntry
            propertiesToIgnore={['id', 'parentId']}
            entry={child}/>
        </tr>
      ))}
    </>
  );
};

export default memo(MasterTableRow);
