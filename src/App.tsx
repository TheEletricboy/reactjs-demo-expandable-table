import Button from './core/components/GenericButton/Button';
import DarkThemeSwitcher from './core/components/DarkTheme/DarkThemeSwitcher';
import { useOverlay } from './core/contexts/OverlayContext';
import { OverlayContainer } from './core/components/OverlayContainer/OverlayContainer';

import './App.scss';
import { useCallback } from 'react';

const lblStartAssingment = 'Start Assignment demo';

const App = () => {
  const { addOverlay } = useOverlay();

  const openOverlay = useCallback(() => {
    addOverlay({
      id: "start-overlay",
      content: <div>Let's begin!</div>,
      isVisible: true,
      type: "modal",
      label: lblStartAssingment,
      // onClose: () => console.log("some log test"),
      // props: { animationType: "fade" }
    });
  }, []);

  return (
    <div className='main-app'>
      <Button title='Begin the demo' label={lblStartAssingment} onClick={openOverlay} />
      <DarkThemeSwitcher/>
      <OverlayContainer/>
    </div>
  );
};

export default App;
