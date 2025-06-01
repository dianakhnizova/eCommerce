import type { Catalog } from '../sources/types/catalog';

export const filterProducts = (
  product: Catalog.DetailedProductResponse,
  selectedColors: string[],
  selectedSizes: string[]
) => {
  const colorAttr = product.masterVariant?.attributes?.find(
    attr => attr.name === 'attribute-color'
  );
  const sizeAttr = product.masterVariant?.attributes?.find(
    attr => attr.name === 'attribute-size'
  );

  return (
    (selectedColors.length === 0 ||
      (colorAttr &&
        typeof colorAttr.value === 'string' &&
        selectedColors.includes(colorAttr.value))) &&
    (selectedSizes.length === 0 ||
      (sizeAttr &&
        typeof sizeAttr.value === 'string' &&
        selectedSizes.includes(sizeAttr.value)))
  );
};
