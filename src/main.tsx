import { createRoot } from 'react-dom/client';
import App from './core/components/App/App.tsx';
import { OverlayContextProvider } from './core/contexts/OverlayContext.tsx';
import './i18n.ts';

import './index.scss';
import './scss/dark-theme.scss';
import { FilterProvider } from './core/contexts/FilterContext.tsx';

createRoot(document.getElementById('root')!).render(
  <OverlayContextProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </OverlayContextProvider>,
);
