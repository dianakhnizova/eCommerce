import styles from '../header.module.css';
import { NavLink } from 'react-router-dom';
import { PagePath } from '../../../router/enums';
import { messages } from './messages';
import { SvgBuilder } from '../../svg-builder/svg-builder';
import { IconType } from '../../svg-builder/enums';

export const RightNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to={PagePath.basketPage} className={styles.logo}>
        {messages.defaultLink}
        <SvgBuilder iconType={IconType.Basket} className={styles.logo} />
      </NavLink>
    </nav>
  );
};
