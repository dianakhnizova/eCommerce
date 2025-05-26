import { messages } from './messages';
import styles from './catalog-options.module.css';
import { Input } from '../../../components/input/input';
import { SortingSelects } from './components/sorting-selects/sorting-selects';

export const CatalogOptions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{messages.navigationTitle}</h2>
      <div className={styles.optionsContainer}>
        <div className={styles.option}>
          <span className={styles.optionsTitle}>{messages.perPage}</span>
          <Input className={styles.input} />
        </div>
        <div className={styles.option}>
          <span className={styles.optionsTitle}>{messages.sortBy}</span>
          <SortingSelects />
        </div>
      </div>
    </div>
  );
};
