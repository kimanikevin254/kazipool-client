import { apiSlice } from "../apiSlice";

const PROPOSAL_URL = '/proposals'

export const proposalApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createProposal: builder.mutation({
            query: (data) => ({
                url: PROPOSAL_URL,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        getJobProposals: builder.query({
            query: (data) => ({
                url: `${PROPOSAL_URL}/${data}`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 1
        }),
        getProposal: builder.query({
            query: (data) => ({
                url: `${PROPOSAL_URL}/proposal/${data}`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 1
        })
    })
})

export const { useCreateProposalMutation, useGetJobProposalsQuery, useGetProposalQuery } = proposalApiSlice

