import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ValidationError } from 'yup';
import { Errors } from '../../app.interface';

const initialState: Errors = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  terms: '',
  image: '',
  country: '',
};

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors(state, action: PayloadAction<ValidationError[]>) {
      action.payload.forEach(({ path, message }) => {
        state[path as keyof typeof initialState] = message;
      });
    },
    clearErrors() {
      return initialState;
    },
  },
});

export default errorSlice.reducer;
