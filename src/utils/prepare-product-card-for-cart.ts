import type { ProductCard } from '../pages/catalog-page/catalog/product-list/types';
import { DEFAULT_VALUE } from '../sources/enums/default-values';
import type { Cart } from '../sources/types/cart';
import { messages } from '../sources/messages';
import { DEFAULT_PRICE } from '../sources/constants/catalog';
import { catalogStore } from '../store/catalog-store';

export const prepareCartItemForProductCard = (item: Cart.Item): ProductCard => {
  const subCategoryId = item.categories?.[0]?.id || '';
  const subCategory = catalogStore.categories.find(
    cat => cat.id === subCategoryId
  );
  const subcategorySlug = subCategory?.slug?.en || DEFAULT_VALUE.SUBCATEGORY;

  const parentCategory = catalogStore.categories.find(
    cat => cat.id === subCategory?.parent?.id
  );
  const categorySlug = parentCategory?.slug?.en || DEFAULT_VALUE.CATEGORY;

  const price = item.price.value.centAmount
    ? (item.price.value.centAmount / 100).toFixed(2)
    : DEFAULT_PRICE;
  const discountPrice = item.price.discounted?.value.centAmount
    ? (item.price.discounted.value.centAmount / 100).toFixed(2)
    : undefined;

  return {
    id: item.productId,
    categorySlug,
    subcategorySlug,
    name: item.name?.en || messages.noName,
    image: item.variant.images?.[0]?.url || messages.placeholderJpg,
    description: item.description?.en || messages.noDescription,
    price,
    discountPrice,
  };
};
