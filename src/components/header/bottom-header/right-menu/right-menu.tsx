import styles from '../bottom-header.module.css';
import svgStyles from '../../../svg-builder/svg.module.css';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';
import { Input } from '../../../input/input';
import { Button } from '../../../button/button';

export const RightNavMenu = () => {
  return (
    <div className={styles.bottomNavigationMenu}>
      <Input type="text" placeholder="Search" className={styles.input} />
      <Button
        onClick={() => console.log('Search')}
        className={styles.searchButton}
      >
        <SvgBuilder iconType={IconType.Search} className={svgStyles.medium} />
      </Button>
    </div>
  );
};
