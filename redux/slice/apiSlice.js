import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001', credentials: "include"})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // useful for caching
    endpoints: (builder) => ({}),
})