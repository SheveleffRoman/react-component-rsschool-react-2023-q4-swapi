import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import detailsSlice from '../src/store/reducers/DetailsSlice';
import { planetAPI } from '../src/services/PlanetService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HttpResponse, http } from 'msw';
import { fakePlanets } from '../src/mocks/mockData';
import { setupServer } from 'msw/node';
import Main from '../pages';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../test-utils/createMockRoute';

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
  detailsSlice,
  [planetAPI.reducerPath]: planetAPI.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(planetAPI.middleware),
  });
};

const store = setupStore();

vi.mock('../src/Components/hooks/details.ts', () => {
  return {
    useDetails: vi.fn().mockReturnValue({
      open: vi.fn(),
    }),
  };
});

describe('Main', () => {
  it('renders loader initially', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Main>{undefined}</Main>
        </Provider>
      </RouterContext.Provider>
    );
    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('hides loader after API response', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Main>{undefined}</Main>
        </Provider>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });
  });

  it('renders 1 card', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Main>{undefined}</Main>
        </Provider>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    });
    const cards = screen.getAllByRole('planet-card');
    expect(cards).toHaveLength(1);
  });

  it('renders correct information', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Main>{undefined}</Main>
        </Provider>
      </RouterContext.Provider>
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
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Main>{undefined}</Main>
        </Provider>
      </RouterContext.Provider>
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

    expect(screen.getByRole('pages')).toHaveTextContent('1/60');
  });

  it('changes current page after previous page btn click', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>
          <Main>{undefined}</Main>
        </Provider>
      </RouterContext.Provider>
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

    expect(screen.getByRole('pages')).toHaveTextContent('1/60');
  });
});
