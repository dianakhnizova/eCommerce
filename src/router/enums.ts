export enum PagePath {
  root = '/',
  notFound = '/*',
  loginPage = '/login',
  registerPage = '/registration',
  aboutPage = '/about',
  cartPage = '/cart',
  catalogPage = '/catalog',
  categoryPage = '/catalog/:categoryId',
  subCategoryPage = '/catalog/:categoryId/:subcategoryId',
  productPage = '/catalog/:categoryId/:subcategoryId/:id',
}
