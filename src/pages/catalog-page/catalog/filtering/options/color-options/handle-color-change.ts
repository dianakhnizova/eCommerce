import { catalogStore } from '../../../../../../store/catalog-store';

export const handleColorChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const selectedColor = event.target.value;

  const isChecked = event.target.checked;

  const newColors = isChecked
    ? [...catalogStore.selectedColors, selectedColor]
    : catalogStore.selectedColors.filter(color => color !== selectedColor);

  catalogStore.setColors(newColors);
  await catalogStore.getProducts();
};
