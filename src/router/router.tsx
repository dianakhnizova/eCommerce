import { createBrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { MainPage } from '../pages/main-page/main-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { PagePath } from './enums';
import { LoginPage } from '../pages/login-page/login-page';
import { RegisterPage } from '../pages/register-page/register-page';
import { AboutPage } from '../pages/about-page/about-page';
import { CartPage } from '../pages/cart-page/cart-page';
import { CatalogPage } from '../pages/catalog-page/catalog-page';
import { ProductPage } from '../pages/product-page/product-page.tsx';
import { ProfilePage } from '../pages/profile-page/profile-page.tsx';

export const router = createBrowserRouter([
  {
    path: PagePath.root,
    Component: Root,
    children: [
      { index: true, Component: MainPage },
      { path: PagePath.notFound, Component: NotFoundPage },
      { path: PagePath.loginPage, Component: LoginPage },
      { path: PagePath.registerPage, Component: RegisterPage },
      { path: PagePath.aboutPage, Component: AboutPage },
      { path: PagePath.cartPage, Component: CartPage },
      { path: PagePath.catalogPage, Component: CatalogPage },
      { path: PagePath.categoryPage, Component: CatalogPage },
      { path: PagePath.subCategoryPage, Component: CatalogPage },
      { path: PagePath.productPage, Component: ProductPage },
      { path: PagePath.profilePage, Component: ProfilePage },
    ],
  },
  {
    path: PagePath.notFound,
    Component: NotFoundPage,
  },
]);
