import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { productStore } from '../../store/product-store.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import styles from './product-page.module.css';
import { messages } from './messages.ts';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs.tsx';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Button } from '../../components/button/button.tsx';

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
    return <div className={styles.empty}>{messages.productNotFound}</div>;
  }

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: (
      <button>
        <FaArrowRight style={{ color: '#3f509e', fontSize: '16px' }} />
      </button>
    ),
    prevArrow: (
      <button>
        <FaArrowLeft style={{ color: '#3f509e', fontSize: '16px' }} />
      </button>
    ),
  };

  return (
    <>
      <BreadCrumbs />
      <div className={styles.wrapper}>
        <div className={styles.sliderWrapper}>
          <Slider {...settings}>
            {product.images.map(image => (
              <div>
                <img
                  src={image.url}
                  alt={messages.imageAltText}
                  className={styles.image}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className={styles.productInfo}>
          <h2 className={styles.productName}>{product.name}</h2>
          <div className={styles.pricesWrapper}>
            <p className={styles.price}>
              {messages.USD}
              {product.price}
            </p>
            <p className={styles.discountPrice}>
              {messages.USD}
              {product.discountPrice}
            </p>
          </div>
          <p className={styles.description}>{product.description}</p>
          <Button className={styles.cartText}>{messages.addToCart}</Button>
          <p></p>
        </div>
      </div>
    </>
  );
});
