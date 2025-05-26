import { messages } from './messages';
import styles from './sorting-selects.module.css';
import { catalogStore } from '../../../../../store/catalog-store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SortField, SortValue, SortOrder } from './enums';

export const SortingSelects = observer(() => {
  const field = catalogStore.sortField;
  const order = catalogStore.sortOrder;

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = event.target.value;
    if (newField === SortField.Default) {
      catalogStore.resetSort();
    } else if (newField === SortField.Name_en || newField === SortField.Price) {
      catalogStore.setSort(newField, SortOrder.Asc);
    }
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value;
    if ((newOrder === SortOrder.Asc || newOrder === SortOrder.Desc) && field) {
      catalogStore.setSort(field, newOrder);
    }
  };

  useEffect(() => {
    if (!field) {
      catalogStore.resetSort();
      return;
    }
    const sortParam = `${field} ${order}`;
    void catalogStore.getProducts(sortParam);
  }, [field, order]);

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
          <option value={SortValue.Asc}>{messages.sortByAsc}</option>
          <option value={SortValue.Desc}>{messages.sortByDesc}</option>
        </select>
      )}
    </div>
  );
});
