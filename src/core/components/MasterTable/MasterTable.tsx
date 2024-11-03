import { useEffect, useState } from 'react';
import { useFilterContext } from '../../contexts/FilterContext';
import { loadParentData } from '../../api/dataService';
import { DataEntry } from './types';
import MasterTableRow from './MasterTableRow/MasterTableRow';
import './MasterTable.scss';

const MasterTable = ({index}: {index?: number}) => {
  const { filters } = useFilterContext();
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetch = async() => {
      // Load parent data and apply filters
      await loadParentData().then((parentData) => {
        const filteredData = parentData.filter((entry) => {
          return Object.keys(filters).every((dimension) => {
            const selectedValues = filters[dimension];
            return (
              selectedValues.length === 0 || selectedValues.includes(entry[dimension])
            );
          });
        });
        setData(filteredData);
        setLoading(false);
      });
    };
    fetch();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data found.</div>;
  }

  return (
    <table className={`table-${index}`}>
      <thead>
        <tr>
          <th>Article</th>
          <th>Region</th>
          <th>Legal Entity</th>
          <th>Version</th>
          <th>Currency</th>
          <th>Measure</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <MasterTableRow key={entry.id} entry={entry} />
        ))}
      </tbody>
    </table>
  );
};

export default MasterTable;
