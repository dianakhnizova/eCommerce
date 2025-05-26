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
    images: Image[];
    prices: Price[];
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
      prices?: Price[];
      images?: Image[];
      attributes?: Attribute[];
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
    attributes: Attribute[];
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

  type Price = {
    value: {
      centAmount: number;
      currencyCode: string;
    };
    discounted?: {
      value: {
        centAmount: number;
        currencyCode: string;
      };
    };
    id?: string;
  };

  type Image = {
    url: string;
    dimensions: {
      w: number;
      h: number;
    };
  };

  type Attribute = {
    name: string;
    value: Record<string, string> | string | number | boolean;
  };
}
