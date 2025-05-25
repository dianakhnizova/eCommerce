import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { catalogStore } from '../../store/catalog-store';
import styles from './catalog-page.module.css';
import { Spinner } from '../../components/spinner/spinner';
import { observer } from 'mobx-react-lite';
import { Wrapper } from '../../components/wrapper/wrapper';
import { CatalogOptions } from './catalog-options/catalog-options';
import { Catalog } from './catalog/catalog';
import { SideBar } from './components/sidebar';

export const CatalogPage = observer(() => {
  const { isLoading } = catalogStore;

  return (
    <>
      <BreadCrumbs />
      <SideBar />
      <Spinner isLoading={isLoading} />
      <Wrapper className={styles.catalogWrapper}>
        <CatalogOptions />
        <Catalog />
      </Wrapper>
    </>
  );
});
