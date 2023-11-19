import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';
import resultsSlice from './reducers/ResultsSlice';
import detailsSlice from './reducers/DetailsSlice';
import { planetAPI } from '../services/PlanetService';

const rootReducer = combineReducers({
  searchReducer,
  resultsSlice,
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
