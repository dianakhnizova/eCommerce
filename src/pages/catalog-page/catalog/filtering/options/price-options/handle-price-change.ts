import { catalogStore } from '../../../../../../store/catalog-store';

export const handlePriceChange = (value: number[]) => {
  catalogStore.setPrice(value[0] * 100, value[1] * 100);
};
