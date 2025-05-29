export type ProductCard = {
  id: string;
  categoryId: string;
  subcategoryId: string;
  name: string;
  image: string;
  description: string;
  price: string;
  discountPrice?: string;
  color?: string;
  size?: string;
};
