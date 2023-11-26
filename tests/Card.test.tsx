import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../src/Components/Card/Card';
import '@testing-library/jest-dom';
import { setupStore } from '../src/store/store';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../test-utils/createMockRoute';

const store = setupStore();

const mockData = {
  name: 'Tatooine',
  climate: 'arid',
  diameter: '10465',
  rotation_period: '23',
  population: '200000',
  terrain: 'desert',
  surface_water: '1',
  url: 'https://swapi.dev/api/planets/1/',
};

vi.mock('../src/Components/hooks/details.ts', () => {
  return {
    useDetails: vi.fn().mockReturnValue({
      open: vi.fn(),
    }),
  };
});

describe('Card', () => {
  it('renders planet name', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Card data={mockData} />
        </Provider>
      </RouterContext.Provider>
    );
    expect(screen.getByRole('planet-card')).toHaveTextContent(mockData.name);
  });

  it('renders planet climate', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Card data={mockData} />
        </Provider>
      </RouterContext.Provider>
    );

    expect(screen.getByRole('planet-card')).toHaveTextContent(mockData.climate);
  });

  it('renders the correct number of <p> elements', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Card data={mockData} />
        </Provider>
      </RouterContext.Provider>
    );

    const paragraphs = screen
      .getAllByRole('planet-card')[0]
      .querySelectorAll('p');

    expect(paragraphs.length).toBe(6);
  });
});
