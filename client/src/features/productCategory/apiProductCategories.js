import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productCategoriesApi = createApi({
    reducerPath: 'productCategoriesApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
            headers.set('access_token', localStorage.access_token)
            return headers
        }
    }),
    tagTypes: ['Post', 'Get'],
    endpoints: (builder) => ({
        getAllproductCategories: builder.query({
            query: () => "product-categories",
            providesTags: ['Post']
        }),
        addEventProduct: builder.mutation({
            query: (body) => ({ url: "product-categories", method: 'POST', body }),
            invalidatesTags: ['Post']
        })
    })
})

export const {
    useGetAllproductCategoriesQuery,
    useAddEventProductMutation
} = productCategoriesApi