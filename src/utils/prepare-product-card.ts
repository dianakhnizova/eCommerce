import type { ProductCard } from '../pages/catalog-page/catalog/product-list/types';
import { DEFAULT_PRICE } from '../sources/constants/catalog';
import { DEFAULT_VALUE } from '../sources/enums/default-values';
import { messages } from '../sources/messages';
import type { Catalog } from '../sources/types/catalog';
import { catalogStore } from '../store/catalog-store';

export const prepareProductCard = (
  product: Catalog.DetailedProductResponse
): ProductCard => {
  const subCategoryId = product.categories?.[0].id || '';
  const subCategory = catalogStore.categories.find(
    cat => cat.id === subCategoryId
  );
  const subcategorySlug = subCategory?.slug?.en || DEFAULT_VALUE.SUBCATEGORY;

  const parentCategory = catalogStore.categories.find(
    cat => cat.id === subCategory?.parent?.id
  );
  const categorySlug = parentCategory?.slug?.en || DEFAULT_VALUE.CATEGORY;

  return {
    id: product.id,
    categorySlug: categorySlug,
    subcategorySlug: subcategorySlug,
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
