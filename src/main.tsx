import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { OverlayContextProvider } from './core/contexts/OverlayContext.tsx';
import { TutorialContextProvider } from './core/contexts/TutorialContext.tsx';

import './i18n.ts';
import './index.scss';
import './scss/dark-theme.scss';

createRoot(document.getElementById('root')!).render(
  <TutorialContextProvider>
    <OverlayContextProvider>
      <App />
    </OverlayContextProvider>,
  </TutorialContextProvider>,
);
