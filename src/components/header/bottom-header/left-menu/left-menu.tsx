import styles from '../bottom-header.module.css';
import { NavLink } from 'react-router-dom';
import { leftLinks } from './left-links-list';
import classNames from 'classnames';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';
import { useState } from 'react';

export const LeftNavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
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
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          );
        })}
      </nav>
      <SvgBuilder
        iconType={IconType.Burger}
        className={styles.burgerMenu}
        onClick={openMenu}
      />
    </>
  );
};
