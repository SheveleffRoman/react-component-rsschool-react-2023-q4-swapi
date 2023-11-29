import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormData } from '../../app.interface';

const initialState: FormData = {
  name: '',
  age: 0,
  email: '',
  password: '',
  // gender: '',
  // terms: false,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    transferData(_state, action: PayloadAction<FormData>) {
      return action.payload;
    },
  },
});

export default dataSlice.reducer;
