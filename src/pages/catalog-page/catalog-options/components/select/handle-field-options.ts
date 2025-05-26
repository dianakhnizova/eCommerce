import { catalogStore } from '../../../../../store/catalog-store';

export const handleFieldOptions = (
  event: React.ChangeEvent<HTMLSelectElement>
) => {
  const newField = event.target.value;
  const newOrder = newField === 'price' ? 'asc' : 'asc';
  catalogStore.setSort(newField, newOrder);
};
