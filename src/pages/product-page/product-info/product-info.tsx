import { Button } from '../../../components/button/button.tsx';
import type { Catalog } from '../../../sources/types/catalog';
import styles from './product-info.module.css';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';
import { messages } from '../../../sources/messages.ts';
import { cartStore } from '../../../store/cart-store.ts';

type Props = {
  product: Catalog.DetailedProduct;
};

export const ProductInfo = ({ product }: Props) => {
  const handleAddToCart = () => {
    void cartStore.addItem({
      productId: product.id,
      quantity: 1,
    });
  };
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
      <Button onClick={handleAddToCart}>{messages.buttons.addToCart}</Button>
    </div>
  );
};
