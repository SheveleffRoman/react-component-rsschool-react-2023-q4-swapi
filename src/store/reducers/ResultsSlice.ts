import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Planet } from '../../App';

interface ResultsState {
  results: Planet[];
}

const initialState: ResultsState = {
  results: [],
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResults(state, action: PayloadAction<Planet[]>) {
      state.results = action.payload;
    },
  },
});

export default resultsSlice.reducer;
