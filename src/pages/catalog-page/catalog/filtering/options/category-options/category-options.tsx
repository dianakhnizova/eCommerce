import { catalogStore } from '../../../../../../store/catalog-store';
import styles from './category-options.module.css';
import { handleCategoryChange } from './handle-category-change';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import type { CategoryOption } from './types';
import { messages } from '../../../../../../sources/messages';

export const CategoryOptions = observer(() => {
  const navigate = useNavigate();
  const categoryList: CategoryOption[] = catalogStore.getCategoryList();

  return (
    <div className={styles.optionContainer}>
      <p className={styles.title}>{messages.titles.categoryTitle}</p>
      <select
        className={styles.select}
        value={catalogStore.selectedCategoryId}
        onChange={event => handleCategoryChange(event, navigate)}
      >
        <option value="">{messages.allCategories}</option>
        {categoryList.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});
