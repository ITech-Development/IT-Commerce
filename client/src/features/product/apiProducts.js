import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100/',
    prepareHeaders: (headers, ) => {
      headers.set('access_token', localStorage.access_token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: () => 'product-carts'
    }),
    getCartsIndoRiau: builder.mutation({
      query: () => ({
        url: "product-carts/indo-riau", method: 'GET', headers: {
          access_token: localStorage.access_token,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    }),
    getCartsJuvindo: builder.mutation({
      query: () => ({
        url: "product-carts/juvindo", method: 'GET', headers: {
          access_token: localStorage.access_token,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    }),
    getCartsItech: builder.mutation({
      query: () => ({
        url: "product-carts/itech", method: 'GET', headers: {
          access_token: localStorage.access_token,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    }),
    incrementProduct: builder.mutation({
      query: (id) => ({
        url: `product-carts/increment/${id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.access_token,
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        url: 'product-carts', // The URL for adding a product to the cart
        method: 'POST', // Use POST to add a product
        headers: {
          access_token: localStorage.access_token,
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(product), // Send the product data in the request body
      }),
    }),
    getAllProducts: builder.query({
      query: () => 'products',
    }),
  })
})

export const {
  useGetAllProductsQuery,
  useGetCartsQuery,
  useAddProductToCartMutation,
  useGetCartsIndoRiauMutation,
  useGetCartsJuvindoMutation,
  useGetCartsItechMutation,
  useIncrementProductMutation
} = productsApi