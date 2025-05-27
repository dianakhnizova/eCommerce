import styles from './option.module.css';
import { Checkbox } from '../../../../../components/checkbox/checkbox';
import { optionSectionList } from './option-section-list';

export const OptionForm = () => {
  return (
    <div className={styles.categoryContainer}>
      {optionSectionList.map((section, sectionIndex) => (
        <div className={styles.optionContainer} key={sectionIndex}>
          <p className={styles.title}>{section.title}</p>
          {section.options.map((option, optionIndex) => (
            <Checkbox
              key={optionIndex}
              className={styles.option}
              label={option.label}
              checked={option.checked}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
