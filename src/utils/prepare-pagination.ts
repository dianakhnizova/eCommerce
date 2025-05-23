import type { Catalog } from '../sources/types/catalog';
import type { Pagination } from '../sources/types/pagination';

export const preparePagination = (
  product: Catalog.ProductResponse
): Pagination => {
  return {
    limit: product.limit,
    offset: product.offset,
    count: product.count,
    total: product.total,
  };
};
