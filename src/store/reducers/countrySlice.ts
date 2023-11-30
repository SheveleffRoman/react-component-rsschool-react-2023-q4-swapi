import { createSlice } from '@reduxjs/toolkit';
import { CountriesStore } from '../../app.interface';

const initialState: CountriesStore = {
  countries: ['russia', 'usa', 'ukraine', 'georgia'],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
