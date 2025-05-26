import { type SortField, SortOrder } from './enums';
import { catalogStore } from '../../../../../store/catalog-store';

export const handleOrderChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  field: SortField
) => {
  const newOrder =
    event.target.value === `${field}-${SortOrder.Asc}`
      ? SortOrder.Asc
      : SortOrder.Desc;
  catalogStore.setSort(field, newOrder);
};
