import { useCallback } from 'react';
import { useOverlay } from '../../contexts/OverlayContext';
import { CloseIcon } from '../CloseIcon/CloseIcon';
import './OverlayContainer.scss';

const defaultLabel = 'Overlay';
const lblCloseOverlay = 'Close Overlay';

export const OverlayContainer = () => {
  const { overlays, removeOverlay, topOverlay } = useOverlay();

  const handleRemoveOverlay = useCallback(() => {
    topOverlay && removeOverlay(topOverlay.id);
  }, [topOverlay, removeOverlay]);

  if (overlays.length === 0) return null;
  return (
    <div className='overlay-container'>
      {overlays.map(overlay => overlay.isVisible && (
        <div key={overlay.id} className='overlay-wrapper'>
          <div
            className='overlay-background'
            onClick={handleRemoveOverlay}
            title={lblCloseOverlay}>
          </div>
          <div className='overlay'>
            <CloseIcon onClick={handleRemoveOverlay} title={lblCloseOverlay}/>
            <div className='overlay-header'>
              <div className='label'>{overlay.label ?? defaultLabel}</div>
            </div>
            <div className='overlay-content'>
              {overlay.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
