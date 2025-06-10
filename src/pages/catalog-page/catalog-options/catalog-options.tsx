import { Input } from '../../../components/input/input';
import { messages } from '../../../sources/messages';
import styles from './catalog-options.module.css';
import { SortingSelects } from './components/sorting-selects/sorting-selects';
import { observer } from 'mobx-react-lite';

export const CatalogOptions = observer(() => {
  return (
    <div className={styles.container}>
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
});
