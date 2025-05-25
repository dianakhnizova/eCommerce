import { messages } from './messages';
import styles from './select.module.css';

export const Select = () => {
  return (
    <select className={styles.select} name="sort" id="sort">
      <option value="price-asc">{messages.sortByAsc}</option>
      <option value="price-desc">{messages.sortByDesc}</option>
      <option value="alphabetically">{messages.sortByAbc}</option>
    </select>
  );
};
