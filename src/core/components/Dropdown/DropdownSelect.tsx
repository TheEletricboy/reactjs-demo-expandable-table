import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TTableFilterOptions } from '../MasterTable/MasterTableFilters/MasterTableFilters';

type TDropdownSelectProps = {
  options: TTableFilterOptions;
  filterValue: string[];
  dimension: string;
  handleChange: (dimension: string, selectedIds: string[]) => void;
}

const DropdownSelect = ({
  options,
  filterValue,
  handleChange,
  dimension,
}: TDropdownSelectProps) => {
  const { t } = useTranslation();
  const placeholderLabel = useMemo(() => dimension.charAt(0).toUpperCase()  + dimension.slice(1).toLowerCase(), [dimension]);
  return (
    <select
      value={filterValue}
      onChange={(e) => handleChange(dimension, [e.target.value])}
    >
      <option value="">{t('table.select', { dimension: placeholderLabel })}</option>
      {options?.[dimension]?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default memo(DropdownSelect);
