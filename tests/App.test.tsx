import { render, screen } from '@testing-library/react';
import { Root } from '../src/router/root.tsx';

test('renders heading', () => {
  render(<Root />);
  expect(screen.getByText('eCommerce Application')).toBeDefined();
});
