import React from 'react';
import './CloseIcon.scss';

export const CloseIcon = ({onClick, ...otherProps}: {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  [x: string]: any
}) => (
  <div
    role='button'
    tabIndex={0}
    className='close-icon'
    onClick={e => onClick(e)}
    {...otherProps}/>
);
