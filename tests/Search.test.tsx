import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../src/Components/SearchBar/SearchBar';
import { AppProvider } from '../src/context/AppProvider';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  it('saves search term to localStorage when clicking on Search', () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <SearchBar />
        </AppProvider>
      </MemoryRouter>
    );

    const input = screen.getByRole('search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'foo' } });

    const button = screen.getByText('Search planets');
    fireEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('foo');
  });

  it('retrieves search term from localStorage on mount', () => {
    localStorage.setItem('searchTerm', 'bar');
    render(
      <MemoryRouter>
        <AppProvider>
          <SearchBar />
        </AppProvider>
      </MemoryRouter>
    );
    const input = screen.getByRole('search') as HTMLInputElement;

    expect(input.value).toBe('bar');
  });
});
