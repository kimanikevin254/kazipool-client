import { apiSlice } from "../apiSlice";

const USERS_URL = '/auth'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: data,
                credentials: "include"
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include'
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = usersApiSlice