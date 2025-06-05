import { messages } from './messages';
import styles from './size-options.module.css';
import { Checkbox } from '../../../../../../components/checkbox/checkbox';
import { handleSizeChange } from './handle-size-change';
import { observer } from 'mobx-react-lite';
import { catalogStore } from '../../../../../../store/catalog-store';

export const SizeOptions = observer(() => {
  const { sizeList, selectedSizes } = catalogStore;

  return (
    <div className={styles.optionContainer}>
      <p className={styles.title}>{messages.sizeTitle}</p>
      {sizeList.map(size => (
        <Checkbox
          key={size}
          label={size}
          value={size}
          checked={selectedSizes.includes(size)}
          onChange={handleSizeChange}
        />
      ))}
    </div>
  );
});
