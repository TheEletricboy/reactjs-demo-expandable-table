import React, { useState } from 'react';
import { loadChildData } from '../../../api/dataService';
import { DataEntry } from '../types';

type MasterTableRowProps = {
  entry: DataEntry;
}

const MasterTableRow: React.FC<MasterTableRowProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleExpandClick = () => {
    if (!isExpanded) {
      setLoading(true);
      // Load child data for the given parent ID
      loadChildData(entry.id).then((childData) => {
        setChildren(childData);
        setLoading(false);
      });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <tr className='parent-row'>
        <td>
          <button onClick={handleExpandClick}>
            {isExpanded ? '-' : '+'}
          </button>
          {entry.Article}
        </td>
        <td>{entry.Region}</td>
        <td>{entry.LegalEntity}</td>
        <td>{entry.Version}</td>
        <td>{entry.Currency}</td>
        <td>{entry.Measure}</td>
        <td>{entry.Value}</td>
      </tr>
      {isExpanded && !loading && children.map((child) => (
        <tr className='table-child' key={child.id}>
          <td style={{ paddingLeft: '20px' }}>{child.Article}</td>
          <td>{child.Region}</td>
          <td>{child.LegalEntity}</td>
          <td>{child.Version}</td>
          <td>{child.Currency}</td>
          <td>{child.Measure}</td>
          <td>{child.Value}</td>
        </tr>
      ))}
    </>
  );
};

export default MasterTableRow;
