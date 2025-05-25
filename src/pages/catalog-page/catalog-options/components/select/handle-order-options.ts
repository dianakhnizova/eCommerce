import { catalogStore } from '../../../../../store/catalog-store';

export const handleOrderOptions = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setOrder: (value: string) => void,
  field: string
) => {
  const selectedOrder = event.target.value;
  setOrder(selectedOrder);

  if (field === 'price') {
    switch (selectedOrder) {
      case 'price-asc': {
        catalogStore.setSort('price', 'asc');
        break;
      }
      case 'price-desc': {
        catalogStore.setSort('price', 'desc');
        break;
      }
    }
  }

  if (field === 'name') {
    switch (selectedOrder) {
      case 'name-asc': {
        catalogStore.setSort('name', 'asc');
        break;
      }
      case 'name-desc': {
        catalogStore.setSort('name', 'desc');
        break;
      }
    }
  }
};
