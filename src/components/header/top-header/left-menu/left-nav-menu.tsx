import styles from '../../header.module.css';
import svgStyles from '../../../svg-builder/svg.module.css';
import { NavLink } from 'react-router';
import { PagePath } from '../../../../router/enums';
import { messages } from '../../bottom-header/messages';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';

export const LeftNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to={PagePath.root}>
        {messages.defaultLink}
        <SvgBuilder iconType={IconType.Logo} className={svgStyles.logo} />
      </NavLink>
    </nav>
  );
};
