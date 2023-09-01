import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://indoteknikserver-732012365989.herokuapp.com/" }),
    endpoints: (builder) => ({
        getCarts: builder.query({
            query: () => "product-carts",
            headers: {
                access_token: localStorage.getItem("access_token"),
                "Content-type": "application/json; charset=UTF-8",
            },
            
        }),

    }),
});

export const {
    useGetCartsQuery
} = productsApi;