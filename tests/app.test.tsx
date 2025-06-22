import { render, screen } from '@testing-library/react';
import { observer } from 'mobx-react-lite';
import { describe, it, expect } from 'vitest';

// Пример простого компонента с observer
const MyComponent = observer(({ text }: { text: string }) => {
  return <div>{text}</div>;
});

describe('MyComponent', () => {
  it('renders the text', () => {
    render(<MyComponent text="Hello observer" />);
    expect(screen.getByText('Hello observer')).toBeInTheDocument();
  });
});
