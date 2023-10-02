import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartsApi = createApi({
    reducerPath: 'cartsApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
            headers.set('access_token', localStorage.access_token)
            return headers
        }
    }),
    tagTypes: ['Post', 'Get'],
    endpoints: (builder) => ({
        getCountCarts: builder.query({
            query: () => "product-carts/count-carts",
            providesTags: ['Post']
        }),
        addToCart: builder.mutation({
            query: (body) => ({ url: "product-carts", method: 'POST', body }),
            invalidatesTags: ['Post']
        }),
        removeItemFromCart: builder.mutation({
            query: (id) => ({
                url: `product-carts/remove/${id}`, // Ganti dengan URL endpoint penghapusan
                method: 'DELETE',
            }),
        }),
        incrementCartItem: builder.mutation({
            query: (id) => ({
                url: `product-carts/increment/${id}`, // Ganti dengan URL endpoint peningkatan
                method: 'PATCH',
            }),
            invalidatesTags: ['Post']
        }),
        decrementCartItem: builder.mutation({ // Menambahkan endpoint untuk mengurangi jumlah item
            query: (id) => ({
                url: `product-carts/decrement/${id}`, // Ganti dengan URL endpoint pengurangan
                method: 'PATCH',
            }),
        }),
        getCartsIndoRiau: builder.query({
            query: () => 'product-carts/indo-riau', // Ganti dengan URL endpoint yang sesuai
        }),
        getCartsJuvindo: builder.query({
            query: () => 'product-carts/juvindo', // Ganti dengan URL endpoint yang sesuai
        }),
        getCartsItech: builder.query({
            query: () => 'product-carts/itech', // Ganti dengan URL endpoint yang sesuai
        }),
    })
})

export const {
    useGetCartsIndoRiauQuery,
    useGetCartsJuvindoQuery,
    useGetCartsItechQuery,
    useGetCountCartsQuery,
    useAddToCartMutation,
    useDecrementCartItemMutation,
    useRemoveItemFromCartMutation,
    useIncrementCartItemMutation,
} = cartsApi