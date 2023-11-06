import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wishlistsApi = createApi({
    reducerPath: 'wishlistsApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
            headers.set('access_token', localStorage.access_token)
            return headers
        }
    }),
    tagTypes: ['Post', 'Get'],
    endpoints: (builder) => ({
        getWishlists: builder.query({
            query: () => "wishlists",
            providesTags: ['Post']
        }),
        addWishlist: builder.mutation({
            query: (id) => ({
                url: `wishlists/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Post'],
        }),
        removeWishlist: builder.mutation({
            query: (id) => ({
                url: `wishlists/${id}`,
                method: 'DELETE', // Assuming DELETE method for removal
            }),
            invalidatesTags: ['Post'],
        }),
    })
})

export const {
    useGetWishlistsQuery,
    useAddWishlistMutation,
    useRemoveWishlistMutation
} = wishlistsApi

