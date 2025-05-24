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
    const handleClickOutside = (event: Event) => {
      if (
        event.target instanceof Element &&
        !event.target.closest(`.${styles.navigationLeftMenu}`) &&
        !event.target.closest(`.${styles.burgerMenu}`)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
      )}
      <Button className={styles.burgerMenu} onClick={openMenu}>
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
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
