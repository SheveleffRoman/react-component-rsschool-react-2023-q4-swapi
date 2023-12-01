import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CollectSubmit, IStore } from '../../app.interface';
import { dataSlice } from './dataSlice';

const initialState: CollectSubmit = {
  collection: [],
};

export const collectSubmit = createSlice({
  name: 'collectSubmit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      dataSlice.actions.setData,
      (state, action: PayloadAction<IStore>) => {
        state.collection.push(action.payload);
      }
    );
  },
});

export default collectSubmit.reducer;
