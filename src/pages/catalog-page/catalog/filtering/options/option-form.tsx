import styles from './option.module.css';
import { observer } from 'mobx-react-lite';
import { CategoryOptions } from './category-options/category-options';
import { SubcategoryOptions } from './subcategory-options/subcategory-options';
import { ColorOptions } from './color-options/color-options';
import { SizeOptions } from './size-options/size-options';

export const OptionForm = observer(() => {
  return (
    <div className={styles.categoryContainer}>
      <CategoryOptions />
      <SubcategoryOptions />
      <ColorOptions />
      <SizeOptions />
    </div>
  );
});
