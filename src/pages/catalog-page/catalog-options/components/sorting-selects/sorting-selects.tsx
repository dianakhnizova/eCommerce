import { messages } from './messages';
import styles from './sorting-selects.module.css';
import { catalogStore } from '../../../../../store/catalog-store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SortField, SortOrder, SortValue } from './enums';
import { handleFieldChange } from './handle-field-change';
import { handleOrderChange } from './handle-order-change';
import { getSortValue } from './get-sort-value';

export const SortingSelects = observer(() => {
  const field = catalogStore.sortField;
  const order = catalogStore.sortOrder;

  useEffect(() => {
    if (!field) {
      catalogStore.resetSort();
      return;
    }
    const sortParam =
      field === SortField.Price
        ? `${SortField.Price} ${order === SortOrder.Asc ? SortOrder.Asc : SortOrder.Desc}`
        : `${SortField.Name_en} ${order === SortOrder.Asc ? SortOrder.Asc : SortOrder.Desc}`;
    void catalogStore.getProducts(sortParam);
  }, [field, order]);

  return (
    <div className={styles.optionsContainer}>
      <select
        className={styles.select}
        onChange={handleFieldChange}
        value={field}
      >
        <option value="">{messages.sortByDefault}</option>
        <option value={SortField.Price}>{messages.sortByPrice}</option>
        <option value={SortField.Name}>{messages.sortByAbc}</option>
      </select>
      {field && (
        <select
          className={styles.select}
          onChange={event => handleOrderChange(event, field)}
          value={getSortValue(field, order)}
        >
          {field === SortField.Price ? (
            <>
              <option value={SortValue.Price_asc}>{messages.sortByAsc}</option>
              <option value={SortValue.Price_desc}>
                {messages.sortByDesc}
              </option>
            </>
          ) : (
            <>
              <option value={SortValue.Name_asc}>{messages.sortByAsc}</option>
              <option value={SortValue.Name_desc}>{messages.sortByDesc}</option>
            </>
          )}
        </select>
      )}
    </div>
  );
});
