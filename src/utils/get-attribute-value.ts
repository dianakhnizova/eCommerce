export const getAttributeValue = (
  attributes: {
    name: string;
    value: Record<string, string> | string | number | boolean | undefined;
  }[],
  attrName: string
): Record<string, string> | string | number | boolean | undefined =>
  attributes.find(attr => attr.name === attrName)?.value || '';
