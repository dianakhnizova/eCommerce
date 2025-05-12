import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './global.module.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={styles.root}>
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
