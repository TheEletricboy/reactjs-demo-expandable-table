import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import './index.scss';
import './scss/dark-theme.scss';
import { OverlayContextProvider } from './core/contexts/OverlayContext.tsx';

createRoot(document.getElementById('root')!).render(
  <OverlayContextProvider>
    <App />
  </OverlayContextProvider>,
);
