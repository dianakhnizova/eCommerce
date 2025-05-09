import styles from '../../header.module.css';
import svgStyles from '../../../svg-builder/svg.module.css';
import { NavLink } from 'react-router-dom';
import { leftLinks } from '../constants';
import { PagePath } from '../../../../router/enums';
import { messages } from '../messages';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';
import classNames from 'classnames';

export const LeftNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to={PagePath.root}>
        {messages.defaultLink}
        <SvgBuilder iconType={IconType.Logo} className={svgStyles.large} />
      </NavLink>

      {leftLinks.map(link => {
        return (
          <NavLink
            key={link.label}
            to={link.to}
            className={classNames(styles.link, styles.bottomLink)}
          >
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
