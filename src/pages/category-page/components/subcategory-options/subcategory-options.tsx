import { catalogStore } from '../../../../store/catalog-store';
import styles from './subcategory-options.module.css';
import { messages } from './messages';
import { handleSubCategoryChange } from './handle-subcategory-change';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const SubCategoryOptions = observer(() => {
  const navigate = useNavigate();

  return (
    <div className={styles.optionContainer}>
      <p className={styles.title}>{messages.subCategoryTitle}</p>
      <select
        className={styles.select}
        value={catalogStore.selectedCategoryId || messages.defaultTitle}
        onChange={event => handleSubCategoryChange(event, navigate)}
      >
        <option value={messages.defaultTitle}>
          {messages.subCategoryOptions.allSubCategories}
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
