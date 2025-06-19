import type { Catalog } from '../../../sources/types/catalog';
import styles from './product-info.module.css';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';
import { observer } from 'mobx-react-lite';
import { ProductMenu } from '../../../components/product-card/product-menu.tsx';

type Props = {
  product: Catalog.DetailedProduct;
};

export const ProductInfo = observer(({ product }: Props) => {
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
      <p>{product.color}</p>
      <p>{product.size}</p>
      <p className={styles.description}>{product.description}</p>

      <ProductMenu productId={product.id} />
    </div>
  );
});
