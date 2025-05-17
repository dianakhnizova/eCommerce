import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
