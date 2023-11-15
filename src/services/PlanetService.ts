import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Planet } from '../App';

interface IPlanets {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export interface IParams {
  searchValue: string | null;
  page: string;
}

export const planetAPI = createApi({
  reducerPath: 'planetAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (build) => ({
    fetchAllPlanets: build.query<IPlanets, IParams>({
      query: (param: IParams) => ({
        url: '/planets',
        params: {
          search: param.searchValue,
          page: param.page,
        },
      }),
    }),
  }),
});
