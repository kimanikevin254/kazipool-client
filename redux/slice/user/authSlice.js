'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: typeof window !== "undefined" && (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null),
    // set loading to true to avoid a flash of the dashboard for unauthenticated users
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // set the data to local storage
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        // clear info from local storage
        clearCredentials: (state, action) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
        // modify isLoadingState
        setIsLoading: (state) => {
            state.isLoading = false
        }
    }
})

export const { setCredentials, clearCredentials, setIsLoading } = authSlice.actions

export default authSlice.reducer