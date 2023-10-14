
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const checkoutsApi = createApi({
  reducerPath: 'checkoutsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
      headers.set('access_token', localStorage.access_token)
      return headers
    }
  }),
  tagTypes: ['Post', 'Get'],
  endpoints: (builder) => ({
    getCheckouts: builder.query({
      query: () => "checkouts"
    }),

  })
})

export const {
  useGetCheckoutsQuery
} = checkoutsApi