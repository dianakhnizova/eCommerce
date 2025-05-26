export namespace Catalog {
  type Product = {
    id: string;
    masterData: MasterData;
    productType: ProductType;
    taxCategory: TaxCategory;
    createdAt: string;
    lastModifiedAt: string;
  };

  type MasterData = {
    current: ProductInfo;
    staged: ProductInfo;
    hasStagedChanges: boolean;
    published: boolean;
  };

  type ProductType = {
    id: string;
    typeId: string;
  };

  type TaxCategory = {
    id: string;
    typeId: string;
  };

  type ProductInfo = {
    categories: ProductCategory[];
    description: Record<string, string>;
    masterVariant: ProductVariant;
    name: Record<string, string>;
    slug: Record<string, string>;
    variants: ProductVariant[];
    searchKeywords: searchKeyword[];
  };

  type searchKeyword = Record<
    string,
    {
      text: string;
      suggestTokenizer: {
        type: string;
        inputs: string[];
      };
    }
  >;

  type ProductCategory = {
    id: string;
    typeId: string;
  };

  type ProductVariant = {
    attributes: [];
    id: number;
    images: [
      {
        dimensions: {
          h: number;
          w: number;
        };
        url: string;
      },
    ];
    prices: [
      {
        value: {
          type: string;
          fractionDigits: number;
          centAmount: number;
          currencyCode: string;
        };
        id: string;
      },
    ];
    sku: string;
  };

  type ProductResponse = {
    results: ProductProjection[];
    limit: number;
    offset: number;
    count: number;
    total: number;
  };

  type ProductProjection = {
    id: string;
    name: { en: string };
    description?: { en: string };
    masterVariant?: {
      prices?: Array<{
        value: { centAmount: number; currencyCode: string };
        discounted?: { value: { centAmount: number; currencyCode: string } };
      }>;
      images?: Array<{ url: string; dimensions: { w: number; h: number } }>;
      attributes?: Array<{ name: string; value: { en: string } }>;
    };
  };

  type DetailedProductResponse = {
    id: string;
    version: number;
    productType: ProductType;
    name: Record<string, string>;
    description: Record<string, string>;
    categories: ProductCategory[];
    categoryOrderHints: Record<string, string>;
    slug: Record<string, string>;
    metaTitle: Record<string, string>;
    metaDescription: Record<string, string>;
    masterVariant: ProductVariant;
    variants: ProductVariant[];
    searchKeywords: searchKeyword[];
    attributes: [];
    hasStagedChanges: boolean;
    published: boolean;
    key: string;
    taxCategory: TaxCategory;
    priceMode: 'Embedded' | 'Standalone';
    createdAt: string;
    lastModifiedAt: string;
  };

  type DetailedProduct = {
    id: string;
    name: string;
    description: string;
    prices: [
      {
        value: {
          type: string;
          fractionDigits: number;
          centAmount: number;
          currencyCode: string;
        };
        id: string;
      },
    ];
    images: [
      {
        dimensions: {
          h: number;
          w: number;
        };
        url: string;
      },
    ];
  };
}
