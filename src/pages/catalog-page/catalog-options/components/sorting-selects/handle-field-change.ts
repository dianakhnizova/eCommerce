import { catalogStore } from '../../../../../store/catalog-store';
import { SortField, SortOrder } from './enums';

export const handleFieldChange = (
  event: React.ChangeEvent<HTMLSelectElement>
) => {
  const value = event.target.value;
  const newField =
    value === SortField.Name || value === SortField.Price
      ? value
      : SortField.Default;
  catalogStore.setSort(newField, SortOrder.Asc);
};
