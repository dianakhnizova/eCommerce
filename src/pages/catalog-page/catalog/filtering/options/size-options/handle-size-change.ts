import { catalogStore } from '../../../../../../store/catalog-store';

export const handleSizeChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const selectedSize = event.target.value;

  const isChecked = event.target.checked;

  const newSizes = isChecked
    ? [...catalogStore.selectedSizes, selectedSize]
    : catalogStore.selectedSizes.filter(size => size !== selectedSize);

  catalogStore.setSizes(newSizes);
};
