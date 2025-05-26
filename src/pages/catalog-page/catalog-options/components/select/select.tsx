import { messages } from './messages';
import styles from './select.module.css';
import { handleFieldOptions } from './handle-field-options';
import { catalogStore } from '../../../../../store/catalog-store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

export const Select = observer(() => {
  const field = catalogStore.sortField || '';
  const order = catalogStore.sortOrder || '';

  const orderValue = field && order ? `${field}-${order}` : '';

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value === `${field}-asc` ? 'asc' : 'desc';
    catalogStore.setSort(field, newOrder);
  };

  useEffect(() => {
    if (!field) {
      catalogStore.resetSort();
    }
  }, [field]);

  return (
    <div className={styles.optionsContainer}>
      <select
        className={styles.select}
        onChange={handleFieldOptions}
        value={field}
      >
        <option value="">{messages.sortByDefault}</option>
        <option value="price">{messages.sortByPrice}</option>
        <option value="name">{messages.sortByAbc}</option>
      </select>
      {field && (
        <select
          className={styles.select}
          onChange={handleOrderChange}
          value={orderValue}
        >
          {field === 'price' ? (
            <>
              <option value="price-asc">{messages.sortByAsc}</option>
              <option value="price-desc">{messages.sortByDesc}</option>
            </>
          ) : (
            <>
              <option value="name-asc">{messages.sortByAsc}</option>
              <option value="name-desc">{messages.sortByDesc}</option>
            </>
          )}
        </select>
      )}
    </div>
  );
});
