export const getAttributeValue = (
  attributes: {
    name: string;
    value: string;
  }[],
  attrName: string
): string => attributes.find(attr => attr.name === attrName)?.value || '';
