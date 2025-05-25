import styles from './left-menu.module.css';
import { NavLink } from 'react-router-dom';
import { leftLinks } from './left-links-list';
import classNames from 'classnames';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';
import { useState } from 'react';
import { Button } from '../../../button/button';
import { useEffect } from 'react';

export const LeftNavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('bodyBlock', isMenuOpen);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
