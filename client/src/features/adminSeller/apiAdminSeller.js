import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminSellersApi = createApi({
  reducerPath: 'adminSellersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
      headers.set('access_token', localStorage.access_token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getAdminSellers: builder.query({
      query: () => "admin-sellers"
    }),
    
  })
})

export const {
    useGetAdminSellersQuery
} = adminSellersApi