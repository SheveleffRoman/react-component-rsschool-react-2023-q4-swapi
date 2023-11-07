import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppProvider } from '../src/context/AppProvider';
import { MemoryRouter } from 'react-router-dom';
import Main from '../src/Pages/Main/Main';

vi.mock('../../API/DataService', () => {
  return {
    getAll: vi.fn().mockResolvedValue({
      data: {
        results: [
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
          {
            name: 'Тестовая планета 2',
            climate: 'жаркий',
            diameter: '6000',
            rotation_period: '12',
            population: '500000',
            terrain: 'пустыни',
            surface_water: '5',
            url: '/planets/2',
          },
        ],
      },
    }),
  };
});

// Внутри beforeEach можно установить isLoading в false
beforeEach(() => {
  vi.mock('../src/context/appContext', () => {
    return {
      useAppContext: vi.fn(() => ({
        searchResults: [],
        setSearchResults: vi.fn(),
        setIsLoading: vi.fn(),
        isLoading: false,
      })),
    };
  });
});

vi.mock('../src/context/appContext', () => {
  return {
    useAppContext: vi.fn(() => ({
      searchResults: [],
      setSearchResults: vi.fn(),
      setIsLoading: vi.fn(),
      isLoading: false,
    })),
  };
});

describe('Main', () => {
  it('renders planet cards', async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Main />
        </AppProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole('planet-card');
      expect(cards).toHaveLength(2);
    });

    // expect(screen.getAllByText('Fake error'));
    screen.debug();
  });
});
