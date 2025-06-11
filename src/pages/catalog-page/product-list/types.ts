export type ProductCard = {
  id: string;
  categorySlug: string;
  subcategorySlug?: string;
  name: string;
  image: string;
  description: string;
  price: string;
  discountPrice?: string;
  color?: string;
  size?: string;
  cartItemId?: string;
};
