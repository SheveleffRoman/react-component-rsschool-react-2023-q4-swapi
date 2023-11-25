import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Planet } from '../../App';

interface ResultsState {
  results: Planet[];
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: ResultsState = {
  results: [],
  totalPages: 0,
  itemsPerPage: 0,
  currentPage: 1,
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
    changePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export default resultsSlice.reducer;
