import { messages } from './messages';
import styles from './color-options.module.css';
import { Checkbox } from '../../../../../../components/checkbox/checkbox';
import { handleColorChange } from './handle-color-change';
import { observer } from 'mobx-react-lite';
import { catalogStore } from '../../../../../../store/catalog-store';

export const ColorOptions = observer(() => {
  const { colorsList, selectedColors } = catalogStore;

  return (
    <div className={styles.optionContainer}>
      <p className={styles.title}>{messages.colorTitle}</p>
      {colorsList.map(color => (
        <Checkbox
          key={color}
          label={color}
          value={color}
          checked={selectedColors.includes(color)}
          onChange={handleColorChange}
        />
      ))}
    </div>
  );
});
