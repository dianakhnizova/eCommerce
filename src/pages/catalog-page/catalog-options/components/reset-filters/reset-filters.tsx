import { Button } from '../../../../../components/button/button';
import { catalogStore } from '../../../../../store/catalog-store';
import { messages } from './messages';
import styles from './reset-filters.module.css';
import { observer } from 'mobx-react-lite';

export const ResetFilters = observer(() => {
  return (
    <Button
      className={styles.resetButton}
      onClick={catalogStore.resetAllFilters}
    >
      {messages.resetButtonTitle}
    </Button>
  );
});
