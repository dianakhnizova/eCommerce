import type { ProductCard } from '../pages/catalog-page/product-card/types';
import { DEFAULT_PRICE } from '../sources/constants/catalog';
import { messages } from '../sources/messages';
import type { Catalog } from '../sources/types/catalog';
import type { Pagination } from '../sources/types/pagination';

export const prepareProductCard = (product: Catalog.Product): ProductCard => {
  const current = product.masterData.current;
  const priceObj = current.masterVariant.prices?.[0]?.value;

  const price = priceObj
    ? `${(priceObj.centAmount / 100).toFixed(2)}`
    : DEFAULT_PRICE;

  const discountPrice = priceObj
    ? `${((priceObj.centAmount / 100) * 0.5).toFixed(2)}`
    : DEFAULT_PRICE;

  return {
    id: product.id,
    name: current.name.en || messages.noName,
    image: current.masterVariant.images?.[0]?.url || messages.placeholderJpg,
    description: current.description.en || messages.noDescription,
    price,
    discountPrice,
  };
};

export const prepareProductPagination = (
  product: Catalog.ProductResponse
): Pagination => {
  return {
    limit: product.limit,
    offset: product.offset,
    count: product.count,
    total: product.total,
  };
};
