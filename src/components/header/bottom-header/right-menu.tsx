import styles from '../header.module.css';
import svgStyles from '../../svg-builder/svg.module.css';
import { SvgBuilder } from '../../svg-builder/svg-builder';
import { IconType } from '../../svg-builder/enums';
import { Input } from '../../input/input';
import { Button } from '../../button/button';

export const RightNavMenu = () => {
  return (
    <nav className={styles.bottomNavigationMenu}>
      <Input type="text" placeholder="Search" className={styles.input} />
      <Button onClick={() => console.log('Search')} disabled={false}>
        <SvgBuilder iconType={IconType.Search} className={svgStyles.medium} />
      </Button>
    </nav>
  );
};
