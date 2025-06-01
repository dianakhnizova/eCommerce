import { messages } from '../header/bottom-header/messages.ts';
import styles from './product-search.module.css';
import { Input } from '../input/input.tsx';
import { useCallback, useState } from 'react';
import { catalogStore } from '../../store/catalog-store.ts';
import { SvgBuilder } from '../svg-builder/svg-builder.tsx';
import { IconType } from '../svg-builder/enums.ts';
import svgStyles from '../svg-builder/svg.module.css';
import { Button } from '../button/button.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { PagePath } from '../../router/enums.ts';

export const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSearchName, setCategories, setSubcategories } = catalogStore;
  const router = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback(
    (e?: React.FormEvent | React.MouseEvent) => {
      e?.preventDefault();

      setCategories('');
      setSubcategories('');
      setSearchName(searchTerm.trim());

      if (location.pathname !== PagePath.catalogPage) {
        void router(PagePath.catalogPage);
      }
    },
    [searchTerm, location.pathname, router]
  );

  return (
    <form className={styles.wrapper} onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder={messages.placeholderSearch}
        className={styles.input}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button className={styles.searchButton}>
        <SvgBuilder iconType={IconType.Search} className={svgStyles.small} />
      </Button>
    </form>
  );
};
