import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { AppProvider } from '../src/context/AppProvider';
import { MemoryRouter } from 'react-router-dom';
import Main from '../src/Pages/Main/Main';
import '@testing-library/jest-dom';

vi.mock('../src/Pages/Main/Main', async () => {
  const actual = (await vi.importActual('../src/Pages/Main/Main')) as object;
  return {
    ...actual,
    handlePage: vi.fn(),
  };
});

vi.mock('../src/context/appContext.ts', async () => {
  const actual = (await vi.importActual(
    '../src/context/appContext.ts'
  )) as object;
  return {
    ...actual,
    useAppContext: vi.fn(() => ({
      searchResults: [
        {
          name: 'Тестовая планета 1',
          climate: 'умеренный',
          diameter: '12000',
          rotation_period: '24',
          population: '1000000',
          terrain: 'леса, горы',
          surface_water: '10',
          url: '/planets/1',
        },
      ],
      nextPage: 'https://swapi.dev/api/planets/?search=&page=2',
      prevPage: 'https://swapi.dev/api/planets/?search=&page=1',
    })),
  };
});

describe('Pagination', () => {
  it('updates URL query parameter when page changes.', async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Main />
        </AppProvider>
      </MemoryRouter>
    );

    const nextBtn = screen.getByRole('button', {
      name: /next/i,
    });
    screen.debug(nextBtn);
  });
});
