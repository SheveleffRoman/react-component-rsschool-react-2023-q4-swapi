import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import Details from '../src/Components/Details/Details';
import '@testing-library/jest-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from '../src/store/reducers/SearchSlice';
import resultsSlice from '../src/store/reducers/ResultsSlice';
import detailsSlice from '../src/store/reducers/DetailsSlice';
import { planetAPI } from '../src/services/PlanetService';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HttpResponse, http } from 'msw';
import { fakeDetailsPlanet } from '../src/mocks/mockData';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('https://swapi.dev/api/planets/:id', () => {
    return HttpResponse.json(fakeDetailsPlanet, { status: 200 });
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

describe('Details', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Provider store={store}>
          <Details />
        </Provider>
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /loading/i });
    expect(heading).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /loading/i })
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(
        /Number of famous movie characters from this planet: 10/i
      )
    ).toBeInTheDocument();
  });
});
