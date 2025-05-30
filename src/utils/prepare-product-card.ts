import type { ProductCard } from '../pages/catalog-page/product-list/types';
import { DEFAULT_PRICE } from '../sources/constants/catalog';
import { messages } from '../sources/messages';
import type { Catalog } from '../sources/types/catalog';
import { catalogStore } from '../store/catalog-store';

export const prepareProductCard = (
  product: Catalog.DetailedProductResponse
): ProductCard => {
  console.log('[prepareProductCard]', product);

  if (!product || typeof product !== 'object' || !product.id) {
    console.warn('Invalid product in prepareProductCard:', product);
    return {
      id: '',
      categorySlug: 'default-category',
      name: messages.noName,
      image: messages.placeholderJpg,
      description: messages.noDescription,
      price: DEFAULT_PRICE,
      discountPrice: DEFAULT_PRICE,
    };
  }

  const category = catalogStore.categories.find(
    cat => cat.id === product.categories?.[0].id
  );
  const slug = category?.slug?.en || 'default-category';

  return {
    id: product.id,
    categorySlug: slug,
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
