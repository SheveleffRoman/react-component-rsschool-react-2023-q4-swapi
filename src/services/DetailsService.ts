import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IPlanetInfo {
  results: string[];
}

export const detailsPlanetAPI = createApi({
  reducerPath: 'planetInfoByIdAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (build) => ({
    fetchPlanetInfo: build.query<IPlanetInfo, string>({
      query: (id) => ({
        url: `/planets/${id}`,
      }),
    }),
  }),
});
