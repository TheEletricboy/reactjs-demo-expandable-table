import React, { memo } from 'react';
import './GenericIcon.scss';

const defaultClassName = 'close-icon';

/**
 * Currently does 2 things: CloseIcon, ExpandableIcon.
 * They are both the same html and differentiate only in the css.
 */
const GenericIcon = ({className, onClick, ...otherProps}: {
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  className?: string;
  [x: string]: any
}) => (
  <div
    role='button'
    tabIndex={0}
    className={className ?? defaultClassName}
    onClick={e => onClick && onClick(e)}
    {...otherProps}/>
);

export default memo(GenericIcon);
