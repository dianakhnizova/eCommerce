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
        catalogStore.sortByPriceAsc();
        break;
      }
      case 'price-desc': {
        catalogStore.sortByPriceDesc();
        break;
      }
    }
  }

  if (field === 'name') {
    switch (selectedOrder) {
      case 'name-asc': {
        catalogStore.sortByNameAsc();
        break;
      }
      case 'name-desc': {
        catalogStore.sortByNameDesc();
        break;
      }
    }
  }
};
