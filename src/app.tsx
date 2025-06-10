import { StrictMode, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { userStore } from './store/user-store';
import { cartStore } from './store/cart-store';

export const App: React.FC = () => {
  useEffect(() => {
    void userStore.init();
    void cartStore.init();
  }, []);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};
