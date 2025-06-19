import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AboutRss } from '../src/pages/about-page/about-rsshool/about-rss';
import { messages } from '../src/pages/about-page/about-rsshool/messages';
import { RSSHOOL_URL } from '../src/sources/constants/common';
import { IconType } from '../src/components/svg-builder/enums';

vi.mock('../src/components/svg-builder/svg-builder', () => ({
  SvgBuilder: ({ iconType, className }: any) => (
    <svg
      data-testid="svg-icon"
      data-icon-type={iconType}
      className={className}
    />
  ),
}));

describe('AboutRss', () => {
  it('renders RSS description text', () => {
    render(<AboutRss />);
    expect(screen.getByText(messages.textRss)).toBeInTheDocument();
  });

  it('renders link with correct attributes and icon inside', () => {
    render(<AboutRss />);
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', RSSHOOL_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    const icon = screen.getByTestId('svg-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon-type', IconType.LogoRss);
  });
});
