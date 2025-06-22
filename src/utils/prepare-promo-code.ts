import type { Cart } from '../sources/types/cart';

export const preparePromoCode = (data: Cart.PromoCodeResponse[]) => {
  const promoCodes: Cart.PromoCode[] = data.map(promoCode => ({
    id: promoCode.id,
    code: promoCode.code,
    name: { en: promoCode.name.en || '' },
  }));
  return promoCodes;
};
