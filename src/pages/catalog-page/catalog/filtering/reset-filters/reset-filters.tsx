import { Button } from '../../../../../components/button/button';
import { PagePath } from '../../../../../router/enums';
import { catalogStore } from '../../../../../store/catalog-store';
import { messages } from './messages';
import styles from './reset-filters.module.css';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

export const ResetFilters = observer(() => {
  const navigate = useNavigate();

  const handleReset = () => {
    catalogStore.resetAllFilters();
    void navigate(PagePath.catalogPage);
  };

  return (
    <Button className={styles.resetButton} onClick={handleReset}>
      {messages.resetButtonTitle}
    </Button>
  );
});
