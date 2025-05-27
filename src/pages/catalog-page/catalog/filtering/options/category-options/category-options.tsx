import { catalogStore } from '../../../../../../store/catalog-store';
import styles from './category-options.module.css';
import { handleCategoryChange } from './handle-category-change';
import { messages } from './messages';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const CategoryOptions = observer(() => {
  const navigate = useNavigate();

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
        {catalogStore.getCategoryList().map(category => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
});
