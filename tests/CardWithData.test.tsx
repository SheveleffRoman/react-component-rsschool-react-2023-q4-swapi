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
        {
          name: 'Тестовая планета 2',
          climate: 'арктический',
          diameter: '15000',
          rotation_period: '20',
          population: '800000',
          terrain: 'ледяные равнины',
          surface_water: '20',
          url: '/planets/2',
        },
        {
          name: 'Тестовая планета 3',
          climate: 'пустынный',
          diameter: '10000',
          rotation_period: '30',
          population: '500000',
          terrain: 'песчаные дюны',
          surface_water: '5',
          url: '/planets/3',
        },
      ],
    })),
  };
});

describe('Main', () => {
  it('renders the specified number of cards', async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Main />
        </AppProvider>
      </MemoryRouter>
    );
    const cards = screen.getAllByRole('planet-card');
    expect(cards).toHaveLength(3);
  });
});
