import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchValue: string | null;
}

const initialState: SearchState = {
  searchValue: localStorage.getItem('searchTerm'),
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeValue(state, action: PayloadAction<string>) {
      localStorage.setItem('searchTerm', action.payload);
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
