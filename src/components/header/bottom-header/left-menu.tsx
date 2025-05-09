import styles from '../header.module.css';
import svgStyles from '../../svg-builder/svg.module.css';
import { NavLink } from 'react-router-dom';
import { leftLinks } from './constants';
import { PagePath } from '../../../router/enums';
import { messages } from './messages';
import { SvgBuilder } from '../../svg-builder/svg-builder';
import { IconType } from '../../svg-builder/enums';

export const LeftNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to={PagePath.root} className={styles.logo}>
        {messages.defaultLink}
        <SvgBuilder iconType={IconType.Logo} className={svgStyles.large} />
      </NavLink>

      {leftLinks.map(link => {
        return (
          <NavLink
            key={link.label}
            to={link.to}
            className={`${styles.link} ${styles.bottomLink}`}
          >
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
