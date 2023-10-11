import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const checkoutProductsApi = createApi({
    reducerPath: 'checkoutProductsApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
            headers.set('access_token', localStorage.access_token)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getAllCheckoutProducts: builder.query({
            query: () => "checkout-products",
        })
    })
})

export const {
    useGetAllCheckoutProductsQuery
} = checkoutProductsApi

