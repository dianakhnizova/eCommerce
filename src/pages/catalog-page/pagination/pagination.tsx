import styles from './pagination.module.css';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { observer } from 'mobx-react-lite';
import { catalogStore } from '../../../store/catalog-store';
import { Button } from '../../../components/button/button';
import { BASED_PAGE } from './constants';

export const Pagination = observer(() => {
  const {
    pagination: { offset, limit, total },
    setPagination,
  } = catalogStore;

  const currentPage = Math.floor(offset / limit) + BASED_PAGE;
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
        disabled={offset === 0}
      >
        <RiArrowLeftSLine />
      </Button>
      <div className={styles.input}>
        Page {currentPage} of {totalPages}
      </div>
      <Button
        className={styles.paginationButton}
        onClick={handleNextButton}
        disabled={offset + limit >= total}
      >
        <RiArrowRightSLine />
      </Button>
    </div>
  );
});
