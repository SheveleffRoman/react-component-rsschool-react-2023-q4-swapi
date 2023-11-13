import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../src/Components/Card/Card';
import '@testing-library/jest-dom';

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
        <Card
          data={mockData}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('planet-card')).toHaveTextContent(mockData.name);
  });

  it('renders planet climate', () => {
    render(
      <MemoryRouter>
        <Card
          data={mockData}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('planet-card')).toHaveTextContent(mockData.climate);
  });
});
