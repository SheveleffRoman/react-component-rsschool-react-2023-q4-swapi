import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataSlice from './reducers/dataSlice';
import countrySlice from './reducers/countrySlice';
import collectSubmit from './reducers/collectSubmit';

const rootReducer = combineReducers({
  dataSlice,
  countrySlice,
  collectSubmit,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
