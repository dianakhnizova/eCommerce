import { ProductList } from '../catalog-page/product-card/product-card';
import { observer } from 'mobx-react-lite';
import styles from './category-page.module.css';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { Wrapper } from '../../components/wrapper/wrapper';
import { catalogStore } from '../../store/catalog-store';
import { messages } from './messages';
import { SubCategoryOptions } from './components/subcategory-options/subcategory-options';

export const CategoryPage = observer(() => {
  const selectedCategory = catalogStore
    .getCategoryList()
    .find(category => category.id === catalogStore.selectedCategoryId);

  return (
    <>
      <BreadCrumbs />

      <Wrapper className={styles.categoryWrapper}>
        <div className={styles.categoryContainer}>
          <h2 className={styles.mainTitle}>
            {selectedCategory ? selectedCategory.label : messages.notCategory}
          </h2>

          <div className={styles.productsContainer}>
            <SubCategoryOptions />
            <ul className={styles.container}>
              <ProductList />;
            </ul>
          </div>
        </div>
      </Wrapper>
    </>
  );
});
