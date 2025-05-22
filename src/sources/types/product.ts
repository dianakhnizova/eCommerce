export type Product = {
  id: string;
  key: string;
  name: string;
  productType: {
    key: string;
    typeId: string;
  };
  description: {
    en: string;
  };
  slug: {
    en: string;
  };
  categories: string[];
  categoryOrderHints?: Record<string, string>;
  priceMode: string;
  searchKeywords?: {
    en?: string[];
  };
  published: boolean;
  hasStagedChanges: boolean;
  variants: {
    key: string;
    sku: string;
    id: number;
    images?: {
      url: string;
      label: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
  }[];
  masterData: {
    current: {
      name: {
        en: string;
      };
    };
  };
};
