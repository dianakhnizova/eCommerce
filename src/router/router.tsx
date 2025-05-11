import { createBrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { HomePage } from '../pages/home-page/home-page';
import { NotFoundPage } from '../pages/notfound-page/notfound-page';
import { PagePath } from './enums';
import { LoginPage } from '../pages/login-page/login-page';
import { RegisterPage } from '../pages/register-page/register-page';

export const router = createBrowserRouter([
  {
    path: PagePath.root,
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: PagePath.notFound, Component: NotFoundPage },
      { path: PagePath.loginPage, Component: LoginPage },
      { path: PagePath.registerPage, Component: RegisterPage },
    ],
  },
  {
    path: PagePath.notFound,
    Component: NotFoundPage,
  },
]);
