import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataSlice from './reducers/dataSlice';

const rootReducer = combineReducers({
  dataSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
