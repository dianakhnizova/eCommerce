import { messages } from './messages';
import styles from './price-options.module.css';
import { observer } from 'mobx-react-lite';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import { catalogStore } from '../../../../../../store/catalog-store';
import { handlePriceChange } from './handle-price-change';
import {
  MAX_PRICE,
  MIN_PRICE,
} from '../../../../../../sources/constants/catalog';

const onSliderChangeComplete = (value: number | number[]) => {
  if (Array.isArray(value)) {
    handlePriceChange(value);
  }
};

export const PriceOptions = observer(() => {
  const [priceRange, setPrice] = useState<[number, number]>([
    catalogStore.priceFrom ? catalogStore.priceFrom / 100 : MIN_PRICE,
    catalogStore.priceTo ? catalogStore.priceTo / 100 : MAX_PRICE,
  ]);

  const onSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice([value[0], value[1]]);
    }
  };

  return (
    <div className={styles.optionContainer}>
      <p className={styles.title}>{messages.priceTitle}</p>
      <Slider
        range
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={priceRange}
        onChange={onSliderChange}
        onChangeComplete={onSliderChangeComplete}
        step={10}
      />
      <div className={styles.priceLabels}>
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
});
