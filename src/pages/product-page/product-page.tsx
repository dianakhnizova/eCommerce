import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { productStore } from '../../store/product-store.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import styles from './product-page.module.css';
import { messages } from './messages.ts';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs.tsx';
import { ProductSlider } from '../../components/product-slider/product-slider.tsx';
import {
  SLIDE_SPEED,
  SLIDES_TO_SCROLL,
  SLIDES_TO_SHOW,
  WAIT_FOR_ANIMATE,
} from './constants.ts';
import { ArrowNext } from './arrow-next/arrow-next.tsx';
import { ArrowPrev } from './arrow-prev/arrow-prev.tsx';
import { ProductInfo } from './product-info/product-info.tsx';
import { Wrapper } from '../../components/wrapper/wrapper.tsx';

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

  return (
    <>
      <BreadCrumbs />
      <Wrapper className={styles.wrapper}>
        <div className={styles.sliderWrapper}>
          <ProductSlider
            images={product.images}
            speed={SLIDE_SPEED}
            slidesToShow={SLIDES_TO_SHOW}
            slidesToScroll={SLIDES_TO_SCROLL}
            waitForAnimate={WAIT_FOR_ANIMATE}
            nextArrow={<ArrowNext />}
            prevArrow={<ArrowPrev />}
            arrows={product.images.length > 1}
          />
        </div>
        <ProductInfo product={product} />
      </Wrapper>
    </>
  );
});
