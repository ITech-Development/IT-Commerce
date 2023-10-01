import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
      headers.set('access_token', localStorage.access_token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: user,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: 'users/register',
        method: 'POST',
        body: user,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }),
    }),
    getMe: builder.query({
      query: () => "users/me"
    }),
  })
})

export const { 
  useGetMeQuery,
  useLoginMutation, 
  useRegisterMutation
 } = usersApi