import { describe, it, expect } from 'vitest';
import { pageTitle } from '../src/router/page-title/page-title';
import { PagePath } from '../src/router/enums';

describe('pageTitle object', () => {
  it('should have correct titles for all defined paths', () => {});

  it('should not contain unexpected keys', () => {
    const expectedKeys = Object.values(PagePath).filter(
      path => !path.includes(':')
    );

    const actualKeys = Object.keys(pageTitle);

    expect(actualKeys.sort()).toEqual(expectedKeys.sort());
  });
});
