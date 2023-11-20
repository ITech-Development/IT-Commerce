import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
            headers.set('access_token', localStorage.access_token)
            return headers
        }
    }),
    tagTypes: ['Post', 'Get'],
    endpoints: (builder) => ({
        getAllEvents: builder.query({
            query: () => "events",
            providesTags: ['Post']
        }),
        addEvent: builder.mutation({
            query: (body) => ({ url: "events", method: 'POST', body }),
            invalidatesTags: ['Post']
        })
    })
})

export const {
    useGetAllEventsQuery,
    useAddEventMutation
} = eventsApi