import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataSlice from './reducers/dataSlice';
import countrySlice from './reducers/countrySlice';
import collectSubmit from './reducers/collectSubmit';
import errorsSlice from './reducers/errorsSlice';

const rootReducer = combineReducers({
  dataSlice,
  countrySlice,
  collectSubmit,
  errorsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['errors/setErrors'],
        },
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
