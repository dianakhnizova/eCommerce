import { messages } from '../header/bottom-header/messages.ts';
import styles from '../header/bottom-header/right-menu/right-menu.module.css';
import { Input } from '../input/input.tsx';
import { useCallback, useState } from 'react';
import { catalogStore } from '../../store/catalog-store.ts';
import { SvgBuilder } from '../svg-builder/svg-builder.tsx';
import { IconType } from '../svg-builder/enums.ts';
import svgStyles from '../svg-builder/svg.module.css';
import { Button } from '../button/button.tsx';

export const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { getProducts } = catalogStore;

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) return;
    void getProducts(searchTerm);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder={messages.placeholderSearch}
        className={styles.input}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch} className={styles.searchButton}>
        <SvgBuilder iconType={IconType.Search} className={svgStyles.small} />
      </Button>
    </>
  );
};
