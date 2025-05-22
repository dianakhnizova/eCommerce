export namespace Product {
  type LocalizedString = Record<string, string>;

  type Reference<Type extends string> = {
    typeId: Type;
    id: string;
  };

  type Attribute = {
    name: string;
    value: string | number | boolean | LocalizedString;
  };

  type Image = {
    url: string;
    dimensions: {
      w: number;
      h: number;
    };
    label?: string;
  };

  type Price = {
    id?: string;
    value: {
      type: 'centPrecision';
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };

  type Asset = {
    id?: string;
    sources: { uri: string; key?: string; contentType?: string }[];
    name?: LocalizedString;
    description?: LocalizedString;
    tags?: string[];
    key?: string;
  };

  type SearchKeywords = Record<
    string,
    {
      text: string;
      suggestTokenizer?: {
        type: string;
        inputs: string[];
      };
    }[]
  >;

  type ProductVariant = {
    id: number;
    sku?: string;
    key?: string;
    prices: Price[];
    images: Image[];
    attributes: Attribute[];
    assets: Asset[];
  };

  type Product = {
    id: string;
    version: number;
    productType: Reference<'product-type'>;
    name: LocalizedString;
    description: LocalizedString;
    categories: Reference<'category'>[];
    categoryOrderHints: Record<string, string>;
    slug: LocalizedString;
    metaTitle: LocalizedString;
    metaDescription: LocalizedString;
    masterVariant: ProductVariant;
    variants: ProductVariant[];
    searchKeywords: SearchKeywords;
    attributes: Attribute[];
    hasStagedChanges: boolean;
    published: boolean;
    key: string;
    taxCategory: Reference<'tax-category'>;
    priceMode: 'Embedded' | 'Standalone';
    createdAt: string;
    lastModifiedAt: string;
  };
}
