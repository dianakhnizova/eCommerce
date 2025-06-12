import styles from './option.module.css';
import { observer } from 'mobx-react-lite';
import { CategoryOptions } from './category-options/category-options';
import { SubcategoryOptions } from './subcategory-options/subcategory-options';
import { ColorOptions } from './color-options/color-options';
import { SizeOptions } from './size-options/size-options';
import { PriceOptions } from './price-options/price-options';
import { SortingSelects } from './sorting-selects/sorting-selects';

export const OptionForm = observer(() => {
  return (
    <div className={styles.categoryContainer}>
      <SortingSelects />
      <CategoryOptions />
      <SubcategoryOptions />
      <ColorOptions />
      <SizeOptions />
      <PriceOptions />
    </div>
  );
});
