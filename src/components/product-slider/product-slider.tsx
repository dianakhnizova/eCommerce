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
} from './constants.ts';
import { ArrowNext } from './arrow-next/arrow-next.tsx';
import { ArrowPrev } from './arrow-prev/arrow-prev.tsx';
import DEFAULT_IMAGE from '../../../assets/images/placeholder.png';

type Props = {
  images: Catalog.Image[];
  onClick: (index: number) => void;
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

export const ProductSlider = ({ images, onClick, ...rest }: Props) => {
  const hasImages = images.length > 0;
  const arrows = hasImages && images.length > 1;

  const slides = hasImages
    ? images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={messages.imageAltText}
          className={styles.image}
          onError={event => {
            event.currentTarget.src = DEFAULT_IMAGE;
          }}
          onClick={() => onClick(index)}
        />
      ))
    : [
        <img
          key="default"
          src={DEFAULT_IMAGE}
          alt={messages.imageAltText}
          className={styles.defaultImage}
        />,
      ];

  return (
    <Slider {...defaultSettings} arrows={arrows} {...rest}>
      {slides}
    </Slider>
  );
};
