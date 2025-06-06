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

  type ProductVariant = {
    attributes: Attribute[];
    id: number;
    images: Image[];
    prices: Price[];
    sku: string;
  };

  type ProductResponse = {
    results: DetailedProductResponse[];
    limit: number;
    offset: number;
    count: number;
    total: number;
  };

  type ProductProjection = {
    id: string;
    categorySlug: string;
    subcategorySlug: string;
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
    price: string;
    discountPrice: string;
    images: Image[];
    color: string;
    size: string;
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
    value: string;
  };

  type CategoriesResponse = {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: ProductCategory[];
  };

  type ProductCategory = {
    id: string;
    typeId: string;
    name?: Record<string, string>;
    slug?: Record<string, string>;
    parent?: { typeId: string; id: string };
  };
}
