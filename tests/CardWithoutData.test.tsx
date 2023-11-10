import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppProvider } from '../src/context/AppProvider';
import { MemoryRouter } from 'react-router-dom';
import Main from '../src/Pages/Main/Main';
import '@testing-library/jest-dom';

vi.mock('../src/context/appContext.ts', async () => {
  const actual = (await vi.importActual(
    '../src/context/appContext.ts'
  )) as object;
  return {
    ...actual,
    useAppContext: vi.fn(() => ({
      searchResults: [],
    })),
  };
});

describe('Main', () => {
  it('renders not found title', async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Main />
        </AppProvider>
      </MemoryRouter>
    );
    const notFound = screen.findByText('Not found');
    expect(notFound);
  });
});
