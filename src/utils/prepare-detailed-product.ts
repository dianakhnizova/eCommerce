import type { Catalog } from '../sources/types/catalog';
import { DEFAULT_PRICE } from '../sources/constants/catalog';
import { AttributeType } from '../sources/enums/attributes.ts';

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

  const attributes = data.masterVariant?.attributes || [];

  const getAttributeValue = (
    attrName: string
  ): Record<string, string> | string | number | boolean | undefined =>
    attributes.find(attr => attr.name === attrName)?.value || '';

  const fullDescription = getAttributeValue(AttributeType.FULL_DESCRIPTION);
  const color = getAttributeValue(AttributeType.COLOR);
  const size = getAttributeValue(AttributeType.SIZE);

  return {
    id: data.id,
    name: data.name.en,
    description: fullDescription,
    color,
    size,
    images: data.masterVariant.images,
    price,
    discountPrice,
  };
};
