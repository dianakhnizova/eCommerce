export enum PagePath {
  root = '/',
  notFound = '/*',
  loginPage = '/login',
  registerPage = '/registration',
  aboutPage = '/about',
  cartPage = '/cart',
  catalogPage = '/catalog',
  profilePage = '/profile',
  categoryPage = '/catalog/:categorySlug',
  subCategoryPage = '/catalog/:categorySlug/:subcategorySlug',
  productPage = '/catalog/:categorySlug/:subcategorySlug/:id',
}
