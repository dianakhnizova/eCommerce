import styles from '../../header.module.css';
import svgStyles from '../../../svg-builder/svg.module.css';
import { NavLink } from 'react-router-dom';
import { rightLinks } from './constants';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { observer } from 'mobx-react-lite';

export const RightNavMenu = observer(() => {
  return (
    <nav className={styles.navigationMenu}>
      {rightLinks.get().map(link => {
        return (
          <NavLink
            key={link.label}
            to={link.to}
            className={styles.link}
            onClick={link.onClick}
          >
            <SvgBuilder iconType={link.iconType} className={svgStyles.small} />
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
});
