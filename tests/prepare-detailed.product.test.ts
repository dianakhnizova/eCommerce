import { describe, it, expect } from 'vitest';
import { preparePagination } from '../src/utils/prepare-pagination';

describe('preparePagination', () => {
  it('should extract pagination data from ProductResponse', () => {
    const mockProductResponse = {
      limit: 20,
      offset: 0,
      count: 10,
      total: 100,
    } as any;

    const result = preparePagination(mockProductResponse);

    expect(result).toEqual({
      limit: 20,
      offset: 0,
      count: 10,
      total: 100,
    });
  });
});
