import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DetailsState {
  isDetailsOpen: boolean;
}

const initialState: DetailsState = {
  isDetailsOpen: false,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    changeDetails(state, action: PayloadAction<boolean>) {
      state.isDetailsOpen = action.payload;
    },
  },
});

export default detailsSlice.reducer;
