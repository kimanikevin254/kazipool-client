'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: null
}

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        // update jobs
        setJobs: (state, action) => {
            state.jobs = action.payload
        },
    }
})

export const { setJobs } = jobSlice.actions

export default jobSlice.reducer