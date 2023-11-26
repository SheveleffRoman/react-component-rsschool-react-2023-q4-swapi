import { fireEvent, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ErrorButton from '../src/Components/Error/ErrorButton';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailsSlice from '../src/store/reducers/DetailsSlice';
import { planetAPI } from '../src/services/PlanetService';

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

describe('ErrorButton', () => {
  it('render error button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ErrorButton />
      </Provider>
    );

    const button = getByText('Fake error');

    expect(button).toBeInTheDocument;
  });

  it('logs error to console when clicked', () => {
    const { getByRole } = render(<ErrorButton />);

    const button = getByRole('fake-error');

    try {
      fireEvent.click(button);
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Fake error');
      }
    }
  });
});
