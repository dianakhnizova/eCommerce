import styles from './product-modal.module.css';
import ImageGallery from 'react-image-gallery';
import {
  SHOW_FULL_SCREEN_BUTTON,
  SHOW_NAV,
  SHOW_PLAY_BUTTON,
  SHOW_THUMBNAILS,
} from './constants.ts';
import { useEffect } from 'react';

type Image = {
  original: string;
};

type Props = {
  images: Image[];
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
    if (globalThis.window !== undefined && typeof document !== 'undefined') {
      document.body.classList.add('noScroll');
    }

    return () => {
      if (globalThis.window !== undefined && typeof document !== 'undefined') {
        document.body.classList.remove('noScroll');
      }
    };
  }, []);

  return (
    <div className={styles.modal} onClick={onClick}>
      <div className={styles.inner} onClick={stopPropagation}>
        <button onClick={onClick} className={styles.closeButton}>
          x
        </button>
        <ImageGallery
          items={images}
          startIndex={startIndex}
          {...defaultSettings}
        />
      </div>
    </div>
  );
};
