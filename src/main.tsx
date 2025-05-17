import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './global.module.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { userStore } from './store/user-store';

const App: React.FC = () => {
  useEffect(() => {
    if (!userStore.isAuth) void userStore.init();
  }, [userStore.user]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
