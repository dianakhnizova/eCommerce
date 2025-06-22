import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { catalogStore } from '../../store/catalog-store';
import styles from './catalog-page.module.css';
import { Spinner } from '../../components/spinner/spinner';
import { observer } from 'mobx-react-lite';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Catalog } from './catalog/catalog';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const CatalogPage = observer(() => {
  const { isLoading, categories } = catalogStore;
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug?: string;
    subcategorySlug?: string;
  }>();

  useEffect(() => {
    if (categories.length > 0) {
      void catalogStore.setCategoryFromUrl(categorySlug, subcategorySlug);
    }
  }, [categorySlug, subcategorySlug, categories]);

  return (
    <>
      <BreadCrumbs />
      <Spinner isLoading={isLoading} />
      <Wrapper className={styles.catalogWrapper}>
        <Catalog />
      </Wrapper>
    </>
  );
});
