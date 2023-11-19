import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Main from '../src/Pages/Main/Main';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import searchReducer from '../src/store/reducers/SearchSlice';
import resultsSlice from '../src/store/reducers/ResultsSlice';
import detailsSlice from '../src/store/reducers/DetailsSlice';
import { planetAPI } from '../src/services/PlanetService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HttpResponse, http } from 'msw';
import { fakePlanets } from '../src/mocks/mockData';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('https://swapi.dev/api/planets', () => {
    return HttpResponse.json(fakePlanets, { status: 200 });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

const rootReducer = combineReducers({
  searchReducer,
  resultsSlice,
  detailsSlice,
  [planetAPI.reducerPath]: planetAPI.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      searchReducer: {
        searchValue: '',
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(planetAPI.middleware),
  });
};

const store = setupStore();

describe('Main', () => {
  it('renders loader initially', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('hides loader after API response', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });
  });

  it('renders 1 card', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });
    const cards = screen.getAllByRole('planet-card');
    expect(cards).toHaveLength(1);
  });

  it('renders correct information', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });
    const planetCard = screen.getByRole('planet-card');

    expect(within(planetCard).getByRole('heading')).toHaveTextContent(
      /tatooine/i
    );
    expect(within(planetCard).getByText(/climate: arid/i)).toBeInTheDocument();
  });

  it('changes current page after next page btn click', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });

    const nextBtn = screen.getByRole('button', {
      name: /next/i,
    });

    expect(screen.getByRole('pages')).toHaveTextContent('1/60');

    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('pages')).toHaveTextContent('2/60');
  });

  it('changes current page after previous page btn click', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });

    const nextBtn = screen.getByRole('button', {
      name: /prev/i,
    });

    expect(screen.getByRole('pages')).toHaveTextContent('1/60');

    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('pages')).toHaveTextContent('0/60');
  });
});
