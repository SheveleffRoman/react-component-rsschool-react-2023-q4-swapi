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
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import detailsSlice from '../src/store/reducers/DetailsSlice';
import { planetAPI } from '../src/services/PlanetService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HttpResponse, http } from 'msw';
import { fakePlanetsWithoutData } from '../src/mocks/mockData';
import { setupServer } from 'msw/node';
import Main from '../pages';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../test-utils/createMockRoute';

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
  it('renders not found', async () => {
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
    expect(screen.getByRole('heading')).toHaveTextContent(/Not found!/i);
  });
});
