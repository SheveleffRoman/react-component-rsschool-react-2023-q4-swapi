import { render, screen, waitFor } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from 'vitest';
import Details from '../src/Components/Details/Details';
import '@testing-library/jest-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailsSlice from '../src/store/reducers/DetailsSlice';
import { planetAPI } from '../src/services/PlanetService';
import { Provider } from 'react-redux';
import { HttpResponse, http } from 'msw';
import { fakeDetailsPlanet } from '../src/mocks/mockData';
import { setupServer } from 'msw/node';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../test-utils/createMockRoute';

const handlers = [
  http.get('https://swapi.dev/api/planets/:id', () => {
    return HttpResponse.json(fakeDetailsPlanet, { status: 400 });
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

describe('Details', () => {
  it('Check error data message', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { id: 'xxx' } })}
      >
        <Provider store={store}>
          <Details />
        </Provider>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /Loading data.../i })
      ).not.toBeInTheDocument();
    });
    expect(screen.getByRole('error-data')).toHaveTextContent(
      /Loading data error/i
    );
  });
});
