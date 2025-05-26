import { SortField, SortOrder, SortValue } from './enums';

export const getSortValue = (
  field: SortField,
  order: SortOrder
): SortValue | SortValue.Default => {
  if (field === SortField.Price) {
    return order === SortOrder.Asc ? SortValue.Price_asc : SortValue.Price_desc;
  }
  if (field === SortField.Name) {
    return order === SortOrder.Asc ? SortValue.Name_asc : SortValue.Name_desc;
  }
  return SortValue.Default;
};
