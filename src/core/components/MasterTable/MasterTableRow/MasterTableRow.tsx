import { memo, useCallback, useState } from 'react';
import { loadChildData } from '../../../api/dataService';
import { DataEntry } from '../types';
import { useTranslation } from 'react-i18next';

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
          <td key={key}>
            <button onClick={handleExpandClick}>
              {isExpanded ? '-' : '+'}
            </button>
            {entry[key as keyof DataEntry]}
          </td>
        );
      };
      return (
        <td key={key}>{entry[key as keyof DataEntry]}</td>
      );
    }) || null
);

const MasterTableRow = ({ entry }: MasterTableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<DataEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleExpandClick = useCallback(async() => {
    if (!isExpanded) {
      setIsLoading(true);
      // Load child data for the given parent ID
      await loadChildData(entry.id).then((childData) => {
        setChildren(childData);
        setIsLoading(false);
      });
    }
    setIsExpanded(prev => !prev);
  }, [entry.id, isExpanded]);

  return (
    <>
      <tr className='parent-row'>
        <CuratedDataEntry
          entry={entry}
          handleExpandClick={handleExpandClick}
          isExpanded={isExpanded}
          shouldAddExpandButton/>
      </tr>
      { isLoading && (
        <tr className='table-child'>
          <td>{`${t('generic.loading')}...`}</td>
        </tr>
      )}
      {isExpanded && !isLoading && children.map((child) => (
        <tr className='table-child' key={child.id}>
          <CuratedDataEntry
            propertiesToIgnore={['id', 'parentId']}
            entry={child}/>
        </tr>
      ))}
    </>
  );
};

export default memo(MasterTableRow);
