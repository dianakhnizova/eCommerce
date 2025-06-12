import styles from './pagination.module.css';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { observer } from 'mobx-react-lite';
import { catalogStore } from '../../store/catalog-store';
import { Button } from '../button/button';
import { DEFAULT_OFFSET, START_PAGE } from './constants';
import { messages } from './messages';

export const Pagination = observer(() => {
  const {
    pagination: { offset, limit, total },
    setPagination,
  } = catalogStore;

  const currentPage = Math.floor(offset / limit) + START_PAGE;
  const totalPages = Math.ceil(total / limit);

  const handlePreviousButton = () => {
    if (offset > 0) {
      setPagination(offset - limit);
    }
  };

  const handleNextButton = () => {
    if (offset + limit < total) {
      setPagination(offset + limit);
    }
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.paginationButton}
        onClick={handlePreviousButton}
        disabled={offset === DEFAULT_OFFSET}
      >
        <RiArrowLeftSLine className={styles.arrow} />
      </Button>
      <div className={styles.panel}>
        {messages.pageTitle} {currentPage} {messages.ofTitle} {totalPages}
      </div>
      <Button
        className={styles.paginationButton}
        onClick={handleNextButton}
        disabled={offset + limit >= total}
      >
        <RiArrowRightSLine className={styles.arrow} />
      </Button>
    </div>
  );
});
