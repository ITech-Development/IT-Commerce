import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventProductsApi = createApi({
    reducerPath: 'eventProductsApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
            headers.set('access_token', localStorage.access_token)
            return headers
        }
    }),
    tagTypes: ['Post', 'Get'],
    endpoints: (builder) => ({
        getAllEventProducts: builder.query({
            query: () => "event-products",
            providesTags: ['Post']
        }),
        addEventProduct: builder.mutation({
            query: (body) => ({ url: "event-products", method: 'POST', body }),
            invalidatesTags: ['Post']
        }),
        deleteEventProduct: builder.mutation({
            query: (id) => ({ url: `event-products/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Post'] 
        })
    })
})

export const {
    useGetAllEventProductsQuery,
    useAddEventProductMutation,
    useDeleteEventProductMutation
} = eventProductsApi