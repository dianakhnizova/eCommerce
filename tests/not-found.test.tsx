import { render, screen, fireEvent } from '@testing-library/react';
import { NotFoundPage } from '../src/pages/not-found-page/not-found-page';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { messages } from '../src/sources/messages';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error image, description, and button', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByAltText(messages.errorPageImage)).toBeInTheDocument();
    expect(screen.getByText(messages.errorPageDescription)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messages.buttons.backToHome })
    ).toBeInTheDocument();
  });

  it('navigates back to home when button is clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', {
      name: messages.buttons.backToHome,
    });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
