import type { Catalog } from '../sources/types/catalog';
import { DEFAULT_PRICE } from '../sources/constants/catalog';

export const prepareDetailedProduct = (
  data: Catalog.DetailedProductResponse
) => {
  const price = data.masterVariant.prices[0].value
    ? `${(data.masterVariant.prices[0].value.centAmount / 100).toFixed(2)}`
    : DEFAULT_PRICE;

  const discountPrice = data.masterVariant.prices[0].value
    ? `${((data.masterVariant.prices[0].value.centAmount / 100) * 0.5).toFixed(2)}`
    : DEFAULT_PRICE;

  return {
    id: data.id,
    name: data.name.en,
    description: data.description.en,
    images: data.masterVariant.images,
    price,
    discountPrice,
  };
};
