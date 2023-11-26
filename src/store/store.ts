import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailsSlice from './reducers/DetailsSlice';
import { planetAPI } from '../services/PlanetService';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  detailsSlice,
  [planetAPI.reducerPath]: planetAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(planetAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
