import styles from '../header.module.css';
import svgStyles from '../../svg-builder/svg.module.css';
import { NavLink } from 'react-router-dom';
import { rightLinks } from './constants';
import { SvgBuilder } from '../../svg-builder/svg-builder';

export const RightNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      {rightLinks.map(link => {
        return (
          <NavLink key={link.label} to={link.to} className={styles.link}>
            {link.label}
            <SvgBuilder
              iconType={link.iconType}
              className={link.iconSize ? svgStyles[link.iconSize] : undefined}
            />
          </NavLink>
        );
      })}
    </nav>
  );
};
