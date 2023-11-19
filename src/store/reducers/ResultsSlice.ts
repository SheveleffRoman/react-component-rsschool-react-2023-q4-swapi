import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Planet } from '../../App';

interface ResultsState {
  results: Planet[];
  itemsPerPage: number;
}

const initialState: ResultsState = {
  results: [],
  itemsPerPage: 0,
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResults(state, action: PayloadAction<Planet[]>) {
      state.results = action.payload;
    },
    saveItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export default resultsSlice.reducer;
