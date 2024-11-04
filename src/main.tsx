import './i18n.ts';
import './index.scss';
import './scss/dark-theme.scss';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppWithContexts from './core/components/App/AppWithContexts.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppWithContexts/>
  </BrowserRouter>,
);
