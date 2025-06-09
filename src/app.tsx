import { StrictMode, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { userStore } from './store/user-store';
import { cartStore } from './store/cart-store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
  useEffect(() => {
    void userStore.init();
    void cartStore.init();
  }, []);

  return (
    <StrictMode>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </StrictMode>
  );
};
