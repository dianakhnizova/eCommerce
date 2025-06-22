import { describe, it, expect } from 'vitest';
import { preparePromoCode } from '../src/utils/prepare-promo-code';
import type { Cart } from '../src/sources/types/cart';

const mockPromoCodes: Cart.PromoCodeResponse[] = [
  {
    id: 'promo123',
    version: 1,
    versionModifiedAt: '2023-01-01T00:00:00Z',
    lastMessageSequenceNumber: 0,
    createdAt: '2023-01-01T00:00:00Z',
    lastModifiedAt: '2023-01-01T00:00:00Z',
    lastModifiedBy: { isPlatformClient: true },
    createdBy: { isPlatformClient: true },
    code: 'SAVE20',
    name: { en: '20% Off' },
    description: { en: 'Get 20% off' },
    cartDiscounts: [{ typeId: 'cart-discount', id: 'discount123' }],
    isActive: true,
    references: [],
    groups: [],
  },
];

describe('preparePromoCode', () => {
  it('should correctly map promo code response to promo code format', () => {
    const result = preparePromoCode(mockPromoCodes);

    expect(result).toEqual([
      {
        id: 'promo123',
        code: 'SAVE20',
        name: { en: '20% Off' },
      },
    ]);
  });
});
