import { StrictMode, useEffect } from 'react';
import './global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { userStore } from './store/user-store';

export const App: React.FC = () => {
  useEffect(() => {
    void userStore.init();
  }, []);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};
