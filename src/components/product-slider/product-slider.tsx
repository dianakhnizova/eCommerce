import { messages } from '../../pages/product-page/messages.ts';
import styles from '../../pages/product-page/product-page.module.css';
import * as React from 'react';
import Slider from 'react-slick';

type Props = {
  images: [
    {
      dimensions: {
        h: number;
        w: number;
      };
      url: string;
    },
  ];
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  waitForAnimate: boolean;
  nextArrow: React.ReactElement;
  prevArrow: React.ReactElement;
  arrows: boolean;
};

export const ProductSlider = ({
  images,
  speed,
  slidesToShow,
  slidesToScroll,
  waitForAnimate,
  nextArrow,
  prevArrow,
  arrows,
}: Props) => {
  const settings = {
    fade: true,
    infinite: true,
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    waitForAnimate: waitForAnimate,
    nextArrow: nextArrow,
    prevArrow: prevArrow,
    arrows: arrows,
  };

  return (
    <Slider {...settings}>
      {images.map(image => (
        <div>
          <img
            src={image.url}
            alt={messages.imageAltText}
            className={styles.image}
          />
        </div>
      ))}
    </Slider>
  );
};
