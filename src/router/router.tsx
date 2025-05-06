import { createBrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { HomePage } from '../pages/home-page/home-page';
import { MainPage } from '../pages/main-page/main-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'main', Component: MainPage },
    ],
  },
]);
