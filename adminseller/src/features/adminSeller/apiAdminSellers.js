import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminSellersApi = createApi({
  reducerPath: 'adminSellersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/', prepareHeaders: (headers, { getState }) => {
      headers.set('access_token', localStorage.access_token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getAdminSellers: builder.query({
      query: () => "admin-sellers"
    }),
    login: builder.mutation({
      query: (adminSeller) => ({
        url: 'admin-sellers/login',
        method: 'POST',
        body: adminSeller,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }),
    }),
  })
})

export const {
  useGetAdminSellersQuery,
  useLoginMutation
} = adminSellersApi