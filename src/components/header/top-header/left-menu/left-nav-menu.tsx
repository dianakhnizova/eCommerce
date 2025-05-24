import styles from '../../header.module.css';
import leftMenuStyles from './left-menu.module.css';
import svgStyles from '../../../svg-builder/svg.module.css';
import { NavLink } from 'react-router';
import { PagePath } from '../../../../router/enums';
import { SvgBuilder } from '../../../svg-builder/svg-builder';
import { IconType } from '../../../svg-builder/enums';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../../../store/user-store';
import { messages } from './messages';

export const LeftNavMenu = observer(() => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to={PagePath.root}>
        {messages.defaultLink}
        <SvgBuilder iconType={IconType.LogoHeader} className={svgStyles.logo} />
      </NavLink>
      {userStore.isAuth && (
        <div className={leftMenuStyles.loginContainer}>
          <NavLink
            to={PagePath.profilePage}
            className={leftMenuStyles.userName}
          >
            {messages.userText}
            {userStore.user?.firstName}
          </NavLink>
        </div>
      )}
    </nav>
  );
});
