import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { productStore } from '../../store/product-store.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import styles from './product-page.module.css';
import { messages } from './messages.ts';

export const ProductPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { product, getProduct, isLoading, error } = productStore;

  useEffect(() => {
    if (id) {
      void getProduct(id);
    }
  }, [id]);

  if (isLoading) {
    return <Spinner isLoading />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!product) {
    return <div className={styles.empty}>{messages.text.productNotFound}</div>;
  }

  return (
    <>
      <h2 className={styles.wrapper}>{messages.text.header}</h2>
      <div>Product with ID: {product.id}</div>
      <div>Product Name: {product.name.en}</div>
    </>
  );
});
