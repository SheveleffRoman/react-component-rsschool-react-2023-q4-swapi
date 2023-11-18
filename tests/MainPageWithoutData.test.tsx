import { render, screen, waitFor } from '@testing-library/react';
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
import { fakePlanetsWithoutData } from '../src/mocks/mockData';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('https://swapi.dev/api/planets', () => {
    return HttpResponse.json(fakePlanetsWithoutData, { status: 200 });
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
  it('renders not found', async () => {
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
    expect(screen.getByRole('heading')).toHaveTextContent(/Not found!/i);
  });
});
