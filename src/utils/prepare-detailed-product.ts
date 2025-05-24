import type { Catalog } from '../sources/types/catalog';

export const prepareDetailedProduct = (
  data: Catalog.DetailedProductResponse
) => {
  return {
    id: data.id,
    name: data.name.en,
    description: data.description.en,
    prices: data.masterVariant.prices,
    images: data.masterVariant.images,
  };
};
