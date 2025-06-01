import type { Catalog } from '../sources/types/catalog';
import { DEFAULT_PRICE } from '../sources/constants/catalog';

export const prepareDetailedProduct = (
  data: Catalog.DetailedProductResponse
) => {
  const price = data.masterVariant?.prices?.[0]?.value?.centAmount
    ? (data.masterVariant.prices[0].value.centAmount / 100).toFixed(2)
    : DEFAULT_PRICE;

  const discountPrice = data.masterVariant?.prices?.[0]?.discounted?.value
    ?.centAmount
    ? (data.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(
        2
      )
    : DEFAULT_PRICE;

  const fullDescriptionAttribute = data.masterVariant.attributes?.find(
    attr => attr.name === 'attribute-full-description'
  );

  const description =
    fullDescriptionAttribute?.value || data.description?.en || '';

  return {
    id: data.id,
    name: data.name.en,
    description,
    images: data.masterVariant.images,
    price,
    discountPrice,
  };
};
