import { messages } from './messages';
import styles from './select.module.css';
import { handleFieldOptions } from './handle-field-options';
import { handleOrderOptions } from './handle-order-options';
import { useState } from 'react';

export const Select = () => {
  const [field, setField] = useState('');
  const [order, setOrder] = useState('');

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleFieldOptions(event, setField, setOrder);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleOrderOptions(event, setOrder, field);
  };

  return (
    <div className={styles.optionsContainer}>
      <select
        className={styles.select}
        onChange={handleFieldChange}
        value={field}
      >
        <option value="price">{messages.sortByPrice}</option>
        <option value="name">{messages.sortByAbc}</option>
      </select>
      {field && (
        <select
          className={styles.select}
          onChange={handleOrderChange}
          value={order}
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
};
