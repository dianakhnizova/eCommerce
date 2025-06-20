import { StrictMode, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { userStore } from './store/user-store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react-lite';

export const App: React.FC = observer(() => {
  useEffect(() => {
    void userStore.init();
  }, []);

  return (
    <StrictMode>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </StrictMode>
  );
});
