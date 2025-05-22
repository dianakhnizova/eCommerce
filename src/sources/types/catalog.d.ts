export namespace Catalog {
  type Product = {
    id: string;
    masterData: MasterData;
    productType: ProductType;
    taxCategory: TaxCategory;
    version: number;
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
    results: Product[];
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}
