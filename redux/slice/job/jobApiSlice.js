import { apiSlice } from "../apiSlice";

const JOB_URL = '/jobs'

export const jobApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => ({
                url: JOB_URL,
                credentials: 'include'
            })
        }),
        getAJob: builder.query({
            query: (id) => ({
                url: `${JOB_URL}/${id}`,
                credentials: "include"
            })
        }),
        getMyJobs: builder.query({
            query: () => ({
                url: `${JOB_URL}/myjobs`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 1 // to avoid showing another user's data in case of instant login and logout with different accounts on the same device
        }),
        createJob: builder.mutation({
            query: (data) => ({
                url: `${JOB_URL}/create`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        })
    })
})

export const { useGetAllJobsQuery, useGetAJobQuery, useGetMyJobsQuery, useCreateJobMutation } = jobApiSlice