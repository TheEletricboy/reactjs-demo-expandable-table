import './TableFilter.scss';
import { memo, useMemo } from "react";
import { TTableFilterOptions } from "../MasterTableFilters";
import DropdownSelect from '../../../Dropdown/DropdownSelect';

type TTableFilterProps = {
  label: string;
  dimension: string;
  options: TTableFilterOptions;
  handleChange: (dimension: string, selectedIds: string[]) => void;
  localFilters: TTableFilterOptions;
}

const TableFilter = ({
  label,
  dimension,
  options,
  handleChange,
  localFilters,
}: TTableFilterProps) => {
  const filterValue = useMemo(() => localFilters[dimension] ?? '', [dimension, localFilters]);
  return (
    <div className='filter-option'>
      <label>{label}</label>
      <DropdownSelect
        filterValue={filterValue}
        handleChange={handleChange}
        dimension={dimension}
        options={options}/>
    </div>
  );
};

export default memo(TableFilter);
