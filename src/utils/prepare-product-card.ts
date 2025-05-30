import type { ProductCard } from '../pages/catalog-page/product-list/types';
import { DEFAULT_PRICE } from '../sources/constants/catalog';
import { messages } from '../sources/messages';
import type { Catalog } from '../sources/types/catalog';
import { catalogStore } from '../store/catalog-store';

export const prepareProductCard = (
  product: Catalog.ProductProjection
): ProductCard => {
  const { selectedCategoryId } = catalogStore;

  const category = catalogStore.categories.find(
    cat => cat.id === selectedCategoryId
  );
  const slug = category?.slug?.en || '';

  return {
    id: product.id,
    categorySlug: slug,
    subcategorySlug: product.subcategorySlug,
    name: product.name?.en || messages.noName,
    image: product.masterVariant?.images?.[0]?.url || messages.placeholderJpg,
    description: product.description?.en || messages.noDescription,
    price: product.masterVariant?.prices?.[0]?.value?.centAmount
      ? (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2)
      : DEFAULT_PRICE,
    discountPrice: product.masterVariant?.prices?.[0]?.discounted?.value
      ?.centAmount
      ? (
          product.masterVariant.prices[0].discounted.value.centAmount / 100
        ).toFixed(2)
      : DEFAULT_PRICE,
  };
};
