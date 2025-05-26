import { messages } from '../../pages/product-page/messages.ts';
import styles from '../../pages/product-page/product-page.module.css';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import type { Catalog } from '../../sources/types/catalog';
import {
  SLIDE_SPEED,
  SLIDES_TO_SCROLL,
  SLIDES_TO_SHOW,
  WAIT_FOR_ANIMATE,
} from '../../pages/product-page/constants.ts';
import { ArrowNext } from '../../pages/product-page/arrow-next/arrow-next.tsx';
import { ArrowPrev } from '../../pages/product-page/arrow-prev/arrow-prev.tsx';
import DEFAULT_IMAGE from '../../../assets/images/placeholder.jpg';

type Props = {
  images: Catalog.Image[];
} & Settings;

const defaultSettings = {
  fade: true,
  infinite: true,
  speed: SLIDE_SPEED,
  slidesToShow: SLIDES_TO_SHOW,
  slidesToScroll: SLIDES_TO_SCROLL,
  waitForAnimate: WAIT_FOR_ANIMATE,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
};

export const ProductSlider = ({ images, ...rest }: Props) => {
  const arrows = images.length > 1;

  return (
    <Slider {...defaultSettings} arrows={arrows} {...rest}>
      {images.map(image => (
        <img
          src={image.url}
          alt={messages.imageAltText}
          className={styles.image}
          onError={event => {
            event.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
      ))}
    </Slider>
  );
};
