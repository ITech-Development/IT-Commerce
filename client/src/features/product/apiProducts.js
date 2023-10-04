
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productsApi = createApi({
  reducerPath: 'productsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
      headers.set('access_token', localStorage.access_token)
      return headers
    }
  }),
  tagTypes: ['Post', 'Get'],
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: () => "product-carts"
    }),
    getProducts: builder.query({
      query: () => "products"
    }),
    getProductCategories: builder.query({
      query: () => ({ url: "product-categories", method: 'GET' })
    }),
    getCountCarts: builder.query({
      query: () => "product-carts/count-carts",
      providesTags: ['Post']
    }),
    addToCart: builder.mutation({
      query: (body) => ({ url: "product-carts", method: 'POST', body }),
      invalidatesTags: ['Post']
    }),
    detailsProduct: builder.query({
      query: (id) => `products/${id}`
    })
  })
})

export const {
  useAddToCartMutation,
  useGetCartsMutation,
  useGetProductsQuery,
  useGetProductCategoriesQuery,
  useGetCountCartsQuery } = productsApi