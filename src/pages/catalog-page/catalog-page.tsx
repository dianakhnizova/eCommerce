import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { catalogStore } from '../../store/catalog-store';
import styles from './catalog-page.module.css';
import { useEffect } from 'react';
import { Spinner } from '../../components/spinner/spinner';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export const CatalogPage = observer(() => {
  const { products, getProducts, isLoading } = catalogStore;

  useEffect(() => {
    void getProducts();
  }, []);

  return (
    <>
      <BreadCrumbs />
      <Spinner isLoading={isLoading} />
      <h2 className={styles.catalogPage}>Catalog Page</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/catalog/${product.id}`}>
              {product.masterData.current.name['en']}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
});
