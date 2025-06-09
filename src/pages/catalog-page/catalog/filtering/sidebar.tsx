import { OptionForm } from './options/option-form';
import styles from './sidebar.module.css';
import { useToggleModal } from '../../../../utils/hooks/use-toggle-modal';
import classNames from 'classnames';
import { Button } from '../../../../components/button/button';
import { SvgBuilder } from '../../../../components/svg-builder/svg-builder';
import { IconType } from '../../../../components/svg-builder/enums';
import { ResetFilters } from './reset-filters/reset-filters';
import { messages } from '../../../../sources/messages';

export const SideBar = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useToggleModal();

  return (
    <>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}
      <Button className={styles.burgerMenu} onClick={toggleMenu}>
        <SvgBuilder iconType={IconType.Filter} className={styles.burger} />
      </Button>

      <div
        className={classNames(styles.container, {
          [styles.active]: isMenuOpen,
        })}
      >
        <h2 className={styles.mainTitle}>
          {messages.titles.filtersSidebarTitle}
        </h2>
        <ResetFilters />
        <OptionForm />
      </div>
    </>
  );
};
