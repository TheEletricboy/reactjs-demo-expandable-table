import './FilterSummary.scss';

import React, { memo } from "react";
import { useFilterContext } from "../../contexts/FilterContext";
import classNames from 'classnames';

const Label = ({children, className}: {children: React.ReactNode, className?: string}) => (
  <div className={classNames('generic-label', className)}>
    {children}
  </div>
);

const FilterSummary= () => {
  const { filters } = useFilterContext();
  return (
    <div className="filter-summary">
      {Object
        .entries(filters)
        .map(([dimension, selectedValues]) => (
          selectedValues.length > 0 && (
            <Label key={dimension} className="">
              <strong>{dimension}:</strong> {selectedValues.join(', ')}
            </Label>
          )
        ))}
    </div>
  );
};

export default memo(FilterSummary);
