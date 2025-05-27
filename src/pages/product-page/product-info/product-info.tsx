import { Button } from '../../../components/button/button.tsx';
import type { Catalog } from '../../../sources/types/catalog';
import styles from './product-info.module.css';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';
import { messages } from '../../../sources/messages.ts';

type Props = {
  product: Catalog.DetailedProduct;
};

export const ProductInfo = ({ product }: Props) => {
  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productName}>{product.name}</h2>
      <div className={styles.pricesWrapper}>
        <p className={styles.price}>
          {CURRENCY_USD}
          {product.price}
        </p>
        <p className={styles.discountPrice}>
          {CURRENCY_USD}
          {product.discountPrice}
        </p>
      </div>
      <p className={styles.description}>{product.description}</p>
      <Button>{messages.buttons.addToCart}</Button>
    </div>
  );
};
