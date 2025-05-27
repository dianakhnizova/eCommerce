import styles from './option.module.css';
import { Checkbox } from '../../../../../components/checkbox/checkbox';
import { getOptionSectionList } from './components/option-section-list';
import { observer } from 'mobx-react-lite';
import { handleCheckboxChange } from './handle-checkbox-change';
import { CategoryOptions } from './category-options/category-options';

export const OptionForm = observer(() => {
  const sectionList = getOptionSectionList();

  return (
    <div className={styles.categoryContainer}>
      <CategoryOptions />

      {sectionList.map(section => (
        <div className={styles.optionContainer} key={section.title}>
          <p className={styles.title}>{section.title}</p>
          {section.options.map(option => (
            <Checkbox
              key={option.id}
              className={styles.option}
              label={option.label}
              checked={option.checked}
              onChange={() => handleCheckboxChange(section.title, option.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
});
