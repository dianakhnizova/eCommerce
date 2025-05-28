import { catalogStore } from '../../../../../../store/catalog-store';
import styles from './category-options.module.css';
import { handleCategoryChange } from './handle-category-change';
import { messages } from './messages';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import type { CategoryOption } from './types';

export const CategoryOptions = observer(() => {
  const navigate = useNavigate();
  const categoryList: CategoryOption[] = catalogStore.getCategoryList();

  return (
    <div className={styles.optionContainer}>
      <p className={styles.title}>{messages.categoryTitle}</p>
      <select
        className={styles.select}
        value={catalogStore.selectedCategoryId || messages.defaultTitle}
        onChange={event => handleCategoryChange(event, navigate)}
      >
        <option value={messages.defaultTitle}>
          {messages.categoryOptions.allCategories}
        </option>
        {categoryList.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});
