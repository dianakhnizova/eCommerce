import { describe, it, expect } from 'vitest';
import { getAttributeValue } from '../src/utils/get-attribute-value';

describe('getAttributeValue', () => {
  const attributes = [
    { name: 'color', value: 'red' },
    { name: 'size', value: 'M' },
  ];

  it('returns correct value if attribute exists', () => {
    expect(getAttributeValue(attributes, 'color')).toBe('red');
    expect(getAttributeValue(attributes, 'size')).toBe('M');
  });

  it('returns empty string if attribute does not exist', () => {
    expect(getAttributeValue(attributes, 'material')).toBe('');
  });

  it('is case-sensitive by default', () => {
    expect(getAttributeValue(attributes, 'Color')).toBe('');
  });

  it('returns empty string for empty attribute array', () => {
    expect(getAttributeValue([], 'size')).toBe('');
  });
});
