
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const rajaOngkirApi = createApi({
    reducerPath: 'rajaOngkirApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
            headers.set('access_token', localStorage.access_token)
            return headers
        }
    }),
    tagTypes: ['Post', 'Get'],
    endpoints: (builder) => ({

        getProvince: builder.query({
            query: () => "users/province"
        }),
        getCity: builder.query({
            query: (id) => `users/city/${id}`
        }),
        getSubdistrict: builder.query({
            query: (id) => `users/subdistrict/${id}`
        }),
        getCost: builder.query({
            // Define the parameters for getCost here
            query: ({ courier, destination, weight }) => {
                return `users/cost?courier=${courier}&destination=${destination}&weight=${weight}`;
            },
        }),
    })
})

export const {
    useGetProvinceQuery,
    useGetCityQuery,
    useGetSubdistrictQuery,
    useGetCostQuery
} = rajaOngkirApi