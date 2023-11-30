import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStore } from '../../app.interface';

const initialState: IStore = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  terms: false,
  image: '',
  country: '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(_state, action: PayloadAction<IStore>) {
      return action.payload;
    },
  },
});

export default dataSlice.reducer;
