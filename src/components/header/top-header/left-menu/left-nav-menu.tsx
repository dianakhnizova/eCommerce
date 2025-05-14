import styles from '../../header.module.css';
import svgStyles from '../../../svg-builder/svg.module.css';
import { NavLink } from 'react-router';
import { PagePath } from '../../../../router/enums';
import { messages } from '../../bottom-header/messages';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../../../store/user-store';

export const LeftNavMenu = observer(() => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to={PagePath.root}>
        {messages.defaultLink}
        <SvgBuilder iconType={IconType.LogoHeader} className={svgStyles.logo} />
      </NavLink>
      {userStore.isAuth && (
        <NavLink to={PagePath.profile} className={styles.link}>
          Hello, {userStore.user?.firstName}
        </NavLink>
      )}
    </nav>
  );
});
