import styles from './subcategory-options.module.css';
import { catalogStore } from '../../../../../../store/catalog-store';
import { handleSubcategoryChange } from './handle-subcategory-change';
import type { CategoryOption } from '../category-options/types';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { messages } from '../../../../../../sources/messages';

export const SubcategoryOptions = observer(() => {
  const navigate = useNavigate();
  const subcategoryList: CategoryOption[] = catalogStore.getSubCategoryList(
    catalogStore.selectedCategoryId
  );

  if (!catalogStore.selectedCategoryId) {
    return null;
  }

  return (
    <div className={styles.optionContainer}>
      <p className={styles.title}>{messages.titles.subcategoryTitle}</p>
      <select
        className={styles.select}
        value={catalogStore.selectedSubcategoryId}
        onChange={event => handleSubcategoryChange(event, navigate)}
      >
        <option value="">{messages.allSubcategoryOptions}</option>
        {subcategoryList.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});
