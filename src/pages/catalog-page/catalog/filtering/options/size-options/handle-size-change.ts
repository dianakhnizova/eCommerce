import { catalogStore } from '../../../../../../store/catalog-store';

export const handleSizeChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const selectedSize = event.target.value;

  const isChecked = event.target.checked;

  const newSizes = isChecked
    ? [...catalogStore.selectedSizes, selectedSize]
    : catalogStore.selectedColors.filter(size => size !== selectedSize);

  catalogStore.setSizes(newSizes);
  await catalogStore.getProducts();
};
