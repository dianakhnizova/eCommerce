import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Wrapper } from '../src/components/wrapper/wrapper';

describe('Wrapper', () => {
  it('renders children correctly', () => {
    render(
      <Wrapper>
        <p>Test content</p>
      </Wrapper>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies passed className along with default one', () => {
    const { container } = render(
      <Wrapper className="custom-class">
        <span>Child</span>
      </Wrapper>
    );

    const wrapperDiv = container.firstChild as HTMLDivElement;
    expect(wrapperDiv.className).toContain('custom-class');
    expect(wrapperDiv.className).toContain('wrapper');
  });
});
