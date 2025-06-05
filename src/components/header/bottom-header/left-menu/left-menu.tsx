import styles from './left-menu.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { leftLinks } from './left-links-list';
import classNames from 'classnames';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';
import { Button } from '../../../button/button';
import { useToggleModal } from '../../../../utils/hooks/use-toggle-modal';
import { PagePath } from '../../../../router/enums.ts';

export const LeftNavMenu = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useToggleModal();
  const location = useLocation();

  const handleLinkClick = (to: string) => () => {
    closeMenu();

    if (location.pathname === to && to === PagePath.catalogPage) {
      globalThis.location.reload();
    }
  };

  return (
    <>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}
      <Button className={styles.burgerMenu} onClick={toggleMenu}>
        <SvgBuilder iconType={IconType.Burger} className={styles.burger} />
      </Button>
      <nav
        className={classNames(styles.navigationLeftMenu, {
          [styles.active]: isMenuOpen,
        })}
      >
        {leftLinks.map(link => {
          return (
            <NavLink
              key={link.label}
              to={link.to}
              className={classNames(styles.link, styles.bottomLink)}
              onClick={handleLinkClick(link.to)}
            >
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
