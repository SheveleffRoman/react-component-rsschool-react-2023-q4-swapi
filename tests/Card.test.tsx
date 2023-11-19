import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../src/Components/Card/Card';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../src/store/store';

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

describe('Card', () => {
  it('renders planet name', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card data={mockData} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByRole('planet-card')).toHaveTextContent(mockData.name);
  });

  it('renders planet climate', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card data={mockData} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('planet-card')).toHaveTextContent(mockData.climate);
  });

  it('renders the correct number of <p> elements', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card data={mockData} />
        </Provider>
      </MemoryRouter>
    );

    const paragraphs = screen
      .getAllByRole('planet-card')[0]
      .querySelectorAll('p');

    expect(paragraphs.length).toBe(6);
  });
});
