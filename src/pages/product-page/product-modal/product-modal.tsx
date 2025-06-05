import styles from './product-modal.module.css';
import ImageGallery from 'react-image-gallery';
import {
  SHOW_FULL_SCREEN_BUTTON,
  SHOW_NAV,
  SHOW_PLAY_BUTTON,
  SHOW_THUMBNAILS,
} from './constants.ts';
import { useEffect } from 'react';
import DEFAULT_IMAGE from '../../../../assets/images/placeholder.png';
import type { Catalog } from '../../../sources/types/catalog';

type Props = {
  images: Catalog.Image[];
  onClick: () => void;
  startIndex: number;
};

const defaultSettings = {
  showThumbnails: SHOW_THUMBNAILS,
  showFullscreenButton: SHOW_FULL_SCREEN_BUTTON,
  showPlayButton: SHOW_PLAY_BUTTON,
  showNav: SHOW_NAV,
};

const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
};

export const ProductModal = ({ images, startIndex, onClick }: Props) => {
  useEffect(() => {
    document.body.classList.add('bodyBlock');

    return () => {
      document.body.classList.remove('bodyBlock');
    };
  }, []);

  const imagesForModal = images.map(img => ({
    original: img.url,
  }));

  return (
    <div className={styles.modal} onClick={onClick}>
      <div className={styles.inner} onClick={stopPropagation}>
        <button onClick={onClick} className={styles.closeButton}>
          x
        </button>
        <ImageGallery
          onErrorImageURL={DEFAULT_IMAGE}
          items={imagesForModal}
          startIndex={startIndex}
          {...defaultSettings}
        />
      </div>
    </div>
  );
};
