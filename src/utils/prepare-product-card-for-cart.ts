import type { ProductCard } from '../pages/catalog-page/catalog/product-list/types';
import { DEFAULT_VALUE } from '../sources/enums/default-values';
import type { Cart } from '../sources/types/cart';
import { messages } from '../sources/messages';
import { DEFAULT_PRICE } from '../sources/constants/catalog';
import { catalogStore } from '../store/catalog-store';
import { cartService } from '../api/services/cart-service/cart-service';

export const prepareCartItemForProductCard = async (
  item: Cart.Item
): Promise<ProductCard> => {
  const product = await cartService.getProductById(item.productId);

  const categories = product.masterData.current.categories || [];
  const description =
    product.masterData.current.description?.en || messages.noDescription;

  const subCategoryId = categories?.[0]?.id || '';
  const subCategory = catalogStore.categories.find(
    cat => cat.id === subCategoryId
  );
  const subcategorySlug = subCategory?.slug?.en || DEFAULT_VALUE.SUBCATEGORY;
  const parentCategory = subCategory?.parent
    ? catalogStore.categories.find(cat => cat.id === subCategory?.parent?.id)
    : null;
  const categorySlug = parentCategory?.slug?.en || subcategorySlug;

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
    description,
    price,
    discountPrice,
  };
};
