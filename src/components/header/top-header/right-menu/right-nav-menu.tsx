import styles from '../../header.module.css';
import svgStyles from '../../../svg-builder/svg.module.css';
import { NavLink } from 'react-router-dom';
import { navigationLinks } from './navigation-links';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { observer } from 'mobx-react-lite';

export const RightNavMenu = observer(() => {
  const links = navigationLinks.get();

  return (
    <nav className={styles.navigationMenu}>
      {links.map(link => {
        return (
          <NavLink
            key={link.label}
            to={link.to}
            className={styles.link}
            onClick={link.onClick}
          >
            <SvgBuilder iconType={link.iconType} className={svgStyles.small} />
            {link.label}
            {Boolean(link.totalCountItems) && (
              <span className={styles.totalCountItems}>
                ({link.totalCountItems})
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
});
