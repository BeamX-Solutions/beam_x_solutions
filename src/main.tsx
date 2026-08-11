import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

// hydrateRoot would be the natural pair for prerendered HTML, but the app
// renders different markup on the client (effects, Turnstile, Supabase data),
// so createRoot re-renders cleanly instead of logging hydration mismatches.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);