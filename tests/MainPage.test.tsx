import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppProvider } from '../src/context/AppProvider';
import { MemoryRouter } from 'react-router-dom';
import Main from '../src/Pages/Main/Main';
import '@testing-library/jest-dom';

describe('Main', () => {
  it('navigates to / on mount', async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Main />
        </AppProvider>
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe('/');
  });

  it('renders loader on search', async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Main />
        </AppProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByRole('search');
    fireEvent.click(searchInput, 'tatooine');

    expect(screen.getByRole('loader')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );
  });
});
