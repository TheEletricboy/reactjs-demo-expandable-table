import React, { memo, useCallback, useEffect, useState } from 'react';
import './ToolTip.scss';
import Button from '../GenericButton/Button';
import { useTranslation } from 'react-i18next';

type TToolTipProps = {
  targetRef: React.RefObject<HTMLElement>;
  content: React.ReactNode;
  onNext: () => void;
}

// @TODO: make these REM
const tooltipWidth = 250;
const tooltipHeight = 100;
const arrowSize = 10;

const ToolTip = ({ targetRef, content, onNext }: TToolTipProps) => {
  const { t } = useTranslation();
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [positionState, setPositionState] = useState('below');

  const updatePosition = useCallback(() => {
    if(targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();

      let top = rect.bottom + arrowSize;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      let position = 'below';

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < 10) {
        left = 10;
      } else if (left + tooltipWidth > viewportWidth - 10) {
        left = viewportWidth - tooltipWidth - 10;
      }

      // Adjust vertical position if tooltip overflows viewport
      if (top + tooltipHeight > viewportHeight - 10) {
        top = rect.top - tooltipHeight - arrowSize;
        position = 'above';
      }

      setTooltipStyles({
        position: 'absolute',
        top: top + window.scrollY,
        left: left + window.scrollX,
        maxWidth: tooltipWidth,
        zIndex: 10000,
      });
      setPositionState(position);
    }
  }, [targetRef]);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetRef, updatePosition]);

  if (!targetRef.current) {
    return null;
  }

  return (
    <div
      className='tooltip-container'
      data-position={positionState}
      style={tooltipStyles}
    >
      <div className='tooltip-content'>
        {content}
        <Button
          onClick={onNext}
          title={t('tutorial.next-title')}
          label={t('tutorial.next-label')}
        />
      </div>
    </div>
  );
};

export default memo(ToolTip);
