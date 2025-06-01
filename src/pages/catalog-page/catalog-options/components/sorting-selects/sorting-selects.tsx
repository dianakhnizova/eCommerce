import { messages } from './messages';
import styles from './sorting-selects.module.css';
import { catalogStore } from '../../../../../store/catalog-store';
import { observer } from 'mobx-react-lite';
import { SortField, SortOrder } from './enums';

export const SortingSelects = observer(() => {
  const field = catalogStore.sortField;
  const order = catalogStore.sortOrder;

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = event.target.value;
    if (newField === SortField.Name_en || newField === SortField.Price) {
      catalogStore.setSort(newField, SortOrder.Asc);
    } else if (newField === SortField.Default) {
      catalogStore.setSort(SortField.Default, SortOrder.Asc);
    }
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value;
    if (newOrder === SortOrder.Asc || newOrder === SortOrder.Desc) {
      catalogStore.setSort(field, newOrder);
    }
  };

  return (
    <div className={styles.optionsContainer}>
      <select
        className={styles.select}
        onChange={handleFieldChange}
        value={field}
      >
        <option value={SortField.Default}>{messages.sortByDefault}</option>
        <option value={SortField.Price}>{messages.sortByPrice}</option>
        <option value={SortField.Name_en}>{messages.sortByAbc}</option>
      </select>
      {field && (
        <select
          className={styles.select}
          onChange={handleOrderChange}
          value={order}
        >
          <option value={SortOrder.Asc}>{messages.sortByAsc}</option>
          <option value={SortOrder.Desc}>{messages.sortByDesc}</option>
        </select>
      )}
    </div>
  );
});
