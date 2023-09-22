
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3100/' }),
  endpoints: (builder) => ({
    getCarts: builder.mutation({
      query: () => ({ url: "product-carts", method: 'GET', headers: {
        access_token: localStorage.access_token,
        "Content-type": "application/json; charset=UTF-8",
      }, })
    }),
    getProducts: builder.query({
      query: () => ({ url: "products", method: 'GET' })
    }),
  })
})

export const { useGetCartsMutation, useGetProductsQuery } = productsApi